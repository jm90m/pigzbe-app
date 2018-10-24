import {Keypair, paymentHistoryAll, loadAccount} from '@pigzbe/stellar-utils';
import {KEYCHAIN_ID_MNEMONIC, KEYCHAIN_ID_STELLAR_KEY, KID_ADD_MEMO_PREPEND, KID_HOME_MEMO_PREPEND} from '../constants';
import Keychain from '../utils/keychain';
import {generateMnemonic, getSeedHex, getKeypair, isValidMnemonic} from '../utils/hd-wallet';
import {appError, loadWallet, restoreKid, settingsUpdate} from './';

export const KEYS_IMPORT_ERROR = 'KEYS_IMPORT_ERROR';
export const KEYS_TEST_USER = 'KEYS_TEST_USER';
export const KEYS_KEYPAIR = 'KEYS_KEYPAIR';
export const KEYS_KEYPAIR_SAVED = 'KEYS_KEYPAIR_SAVED';
export const KEYS_RESTORE_LOADING = 'KEYS_RESTORE_LOADING';
export const KEYS_RESTORE_ERROR = 'KEYS_RESTORE_ERROR';

export const createMnemonic = () => async () => {
    const mnemonic = await generateMnemonic();
    const seedHex = getSeedHex(mnemonic);
    return {mnemonic, seedHex};
};

export const createKeysFromSeed = (seedHex, index = 0) => () => getKeypair(seedHex, index);

export const createKeypair = () => async (dispatch, getState) => {
    const mnemonic = await Keychain.load(KEYCHAIN_ID_MNEMONIC);

    const keyIndex = getState().settings.keyIndex + 1;

    await dispatch(settingsUpdate({keyIndex}));

    if (mnemonic) {
        return getKeypair(getSeedHex(mnemonic), keyIndex);
    }

    return null;
};

export const setKeys = (keypair, mnemonic, keysSaved) => ({type: KEYS_KEYPAIR, keypair, mnemonic, keysSaved});

export const saveKeys = () => async (dispatch, getState) => {
    const {publicKey, secretKey, mnemonic} = getState().keys;
    if (mnemonic) {
        await Keychain.save(KEYCHAIN_ID_MNEMONIC, mnemonic);
    }
    await Keychain.save(KEYCHAIN_ID_STELLAR_KEY, secretKey);
    dispatch({type: KEYS_KEYPAIR_SAVED});
    await dispatch(loadWallet(publicKey));
};

export const restoreKeysError = error => ({type: KEYS_RESTORE_ERROR, error});
export const restoreKeysLoading = value => ({type: KEYS_RESTORE_LOADING, value});

const findSecretKey = (publicKey, seedHex, index) => {
    if (index > 100) {
        return null;
    }
    const keypair = getKeypair(seedHex, index);
    if (keypair.publicKey() === publicKey) {
        return {
            secretKey: keypair.secret(),
            index
        };
    }
    return findSecretKey(publicKey, seedHex, index + 1);
};

export const restoreKeys = mnemonic => async dispatch => {
    dispatch(restoreKeysError(null));
    dispatch(appError(null));
    dispatch(restoreKeysLoading(true));

    try {
        if (!isValidMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic');
        }
        const seedHex = getSeedHex(mnemonic);
        const keypair = getKeypair(seedHex, 0);
        const publicKey = keypair.publicKey();

        const payments = await paymentHistoryAll(publicKey);

        const accountsCreated = payments.filter(p => p.type === 'create_account' && p.funder === publicKey);

        const accountsFound = [];
        const kidsFound = [];

        for (const payment of accountsCreated) {
            const address = payment.account;
            console.log('address', address);
            const transaction = await payment.transaction();
            console.log('transaction', transaction);
            const memo = transaction.memo_type === 'text' ? transaction.memo : '';
            console.log('memo', memo);

            const {secretKey, index} = findSecretKey(address, seedHex, 1);

            accountsFound.push({
                address,
                memo,
                secretKey,
                index,
            });

            // if (memo.indexOf(KID_ADD_MEMO_PREPEND) === 0) {
            //     console.log('found kid address');
            //     const name = memo.slice(KID_ADD_MEMO_PREPEND.length);
            //     const account = await loadAccount(address);
            //     const {secretKey} = findSecretKey(address, seedHex, 1);
            //     await Keychain.save(`secret_${address}`, secretKey);
            //
            //     kidsFound.push({
            //         name,
            //         address,
            //         account
            //     });
            // }

            // if (memo.indexOf(KID_HOME_MEMO_PREPEND) === 0) {
            //     console.log('found kid home');
            //     const home = await loadAccount(address);
            //     console.log('kidHome', home);
            //     kidsFound[kidsFound.length - 1].home = home;
            //     const {secretKey} = findSecretKey(address, seedHex, 1);
            //     await Keychain.save(`secret_${address}`, secretKey);
            // }
        }

        // for (const kid of kidsFound) {
        // const {name, address, home, account} = kid;
        // dispatch(restoreKid(name, address, home, account));
        // }

        const kidAccounts = accountsFound
            .sort((a, b) => a.index - b.index)
            .reduce((kids, {index, memo, address, secretKey}) => {
                console.log('Found account', index, address, secretKey, memo);
                if (memo.indexOf(KID_ADD_MEMO_PREPEND) === 0) {
                    const name = memo.slice(KID_ADD_MEMO_PREPEND.length);
                    return kids.concat({
                        name,
                        address
                    });
                }
                if (memo.indexOf(KID_HOME_MEMO_PREPEND) === 0) {
                    kids[kids.length - 1].home = address;
                }
                return kids;
            }, []);

        for (const k of kidAccounts) {
            console.log('Found', k.name, k.address, k.home);
            dispatch(restoreKid(k.name, k.address, k.home));
        }

        dispatch(setKeys(keypair, mnemonic, true));
        await dispatch(saveKeys());
    } catch (error) {
        console.log(error);
        const err = new Error('Could not recover account. Please check your mnemonic and ensure you are trying to recover and account that was previously funded.');
        dispatch(restoreKeysError(err));
        dispatch(appError(err));
    }
    dispatch(restoreKeysLoading(false));
};

export const importKeyError = error => ({type: KEYS_IMPORT_ERROR, error});

export const importKey = secretKey => async dispatch => {
    dispatch(importKeyError(null));
    dispatch(appError(null));

    try {
        const keypair = Keypair.fromSecret(secretKey);
        dispatch(setKeys(keypair, null, true));
        await dispatch(saveKeys());
    } catch (error) {
        console.log(error);
        const err = new Error('Invalid key');
        dispatch(importKeyError(err));
        dispatch(appError(err));
    }
};

export const getKeys = () => async (dispatch, getState) => {
    const mnemonic = await Keychain.load(KEYCHAIN_ID_MNEMONIC);
    const secretKey = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
    const {testUserKey} = getState().keys;

    console.log(mnemonic);

    if (testUserKey) {
        return Keypair.fromSecret(secretKey);
    }

    if (mnemonic) {
        return getKeypair(getSeedHex(mnemonic), 0);
    }

    if (secretKey) {
        return Keypair.fromSecret(secretKey);
    }

    return null;
};

export const loadKeys = () => async dispatch => {
    try {
        const keypair = await dispatch(getKeys());
        dispatch(setKeys(keypair, null, true));
    } catch (error) {
        console.log(error);
    }
};

export const clearKeys = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_MNEMONIC);
    await Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
    dispatch(setKeys(null));
};

export const keysTestUser = testUserKey => ({type: KEYS_TEST_USER, testUserKey});
