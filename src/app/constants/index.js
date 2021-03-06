export const strings = require('./strings.json');

export * from './screens';

export const CURRENCIES = {
    USD: {name: 'United States dollar', symbol: '$', dps: 2},
    EUR: {name: 'Euro', symbol: '€', dps: 2},
    JPY: {name: 'Japanese yen', symbol: '¥', dps: 0},
    GBP: {name: 'Pound sterling', symbol: '£', dps: 2},
    AUD: {name: 'Australian dollar', symbol: '$', dps: 2},
    CAD: {name: 'Canadian dollar', symbol: '$', dps: 2},
    CHF: {name: 'Swiss franc', symbol: 'CHF', dps: 2, icon: 'swissFranc'},
    CNY: {name: 'Renminbi', symbol: '¥', dps: 2},
    SEK: {name: 'Swedish krona', symbol: 'kr', dps: 2, icon: 'krona'},
    NZD: {name: 'New Zealand dollar', symbol: '$', dps: 2},
    MXN: {name: 'Mexican peso', symbol: '$', dps: 2},
    SGD: {name: 'Singapore dollar', symbol: '$', dps: 2},
    HKD: {name: 'Hong Kong dollar', symbol: '$', dps: 2},
    NOK: {name: 'Norwegian krone', symbol: 'kr', dps: 2, icon: 'nok'},
    KRW: {name: 'South Korean won', symbol: '₩', dps: 2},
    TRY: {name: 'Turkish lira', symbol: '₺ ', dps: 2},
    RUB: {name: 'Russian ruble', symbol: '₽', dps: 2},
    INR: {name: 'Indian rupee', symbol: '₹ ', dps: 2},
    BRL: {name: 'Brazilian real', symbol: 'R$', dps: 2},
    ZAR: {name: 'South African rand', symbol: 'R', dps: 2},
    GOLD: {name: 'Gold', symbol: 'Gold', dps: 5},
    XLM: {name: 'Stellar Lumens', symbol: 'XLM ', dps: 5, icon: 'stellar', appendSymbol: true},
    BTC: {name: 'Bitcoin', symbol: '₿', dps: 5},
    ETH: {name: 'Etheruem', symbol: 'Ξ', dps: 5},
    WLO: {name: 'Wollo', symbol: 'WLO', dps: 5, appendSymbol: true},
};

export const BASE_CURRENCY = 'USD';
export const COINS = ['WLO', 'XLM', 'BTC', 'ETH', 'EUR', 'USD', 'JPY', 'GBP', 'GOLD'];

export const ASSET_CODE = 'WLO';
export const ASSET_DPS = CURRENCIES[ASSET_CODE].dps;

export const PRIVACY_URL = 'https://pigzbe.com/pdf/pigzbe_privacy_notice.pdf';
export const TERMS_URL = 'https://pigzbe.com/pdf/pigzbe_terms_of_website_use.pdf';
export const SUPPORT_EMAIL = 'mailto:support@pigzbe.com';
// export const FUNDING_URL = 'https://medium.com/@pigzbe';
export const FUNDING_URL = 'https://rebrand.ly/pigzb28b53';

export const CONVERSION_CREDIT_URL = 'https://www.cryptocompare.com/';

export const MAX_INNER_WIDTH = 440;

export const NUM_VALIDATIONS = 7;

export const ID_ICO = 'ico';
export const ID_AIRDROP = 'airdrop';

export const CLAIM_CONTRACT_NAME = {
    [ID_ICO]: 'WLO',
    [ID_AIRDROP]: 'WLOA',
};

export const KEYCHAIN_ID_MNEMONIC = 'com.pigzbe.PigzbeApp.mnemonic';
export const KEYCHAIN_ID_PASSCODE = 'com.pigzbe.PigzbeApp.passcode';
export const KEYCHAIN_ID_STELLAR_KEY = 'com.pigzbe.PigzbeApp.stellarKey';
export const KEYCHAIN_ID_ETH_KEY = 'com.pigzbe.PigzbeApp.ethKey';
export const KEYCHAIN_ID_ETH_KEY_ICO = `${KEYCHAIN_ID_ETH_KEY}_${ID_ICO}`;
export const KEYCHAIN_ID_ETH_KEY_AIRDROP = `${KEYCHAIN_ID_ETH_KEY}_${ID_AIRDROP}`;

export const STORAGE_KEY_SETTINGS = 'settings';
export const STORAGE_KEY_KIDS = 'kids';
export const STORAGE_KEY_TASKS = 'tasks';
export const STORAGE_KEY_BURNING = 'burning';
export const STORAGE_KEY_EXCHANGE = 'exchange';
export const STORAGE_KEY_BURNING_ICO = `${STORAGE_KEY_BURNING}_${ID_ICO}`;
export const STORAGE_KEY_BURNING_AIRDROP = `${STORAGE_KEY_BURNING}_${ID_AIRDROP}`;


export const PASSCODE_LENGTH = 6;
export const KID_PASSCODE_LENGTH = 3;

export const KID_SEND_MAX_AMOUNT = 100;

export const MEMO_PREPEND_CREATE = 'C:';
export const MEMO_PREPEND_TASK = 'T:';
export const MEMO_PREPEND_PRESENT = 'P:';
export const MEMO_PREPEND_ALLOWANCE = 'A:';
export const MEMO_PREPEND_DELETE = 'D:';

export const MIN_BALANCE = 1.6;
export const MIN_BALANCE_XLM_ADD_KID = 1.6;

export const KID_WALLET_BALANCE_XLM = String(MIN_BALANCE_XLM_ADD_KID);

export const MEMO_MAX_LEN = 28;

export const INFLATION_DEST = 'GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT';

export const KID_NICKNAME_MAX_LEN = 15;
export const PARENT_NICKNAME_MAX_LEN = 10;

export const HORIZON_FALLBACK = 'https://horizon.stellar.org';
