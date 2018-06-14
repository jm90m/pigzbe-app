import {Asset, trustAsset} from '@pigzbe/stellar-utils';
import {claim} from './api';
import {LOADING, LOCAL_STORAGE, ERROR} from '../constants/action-types';
import {strings} from '../constants';
import Config from 'react-native-config';

export const trustStellarAsset = () => async (dispatch, getState) => {
    const {stellar} = getState().user;
    const {localStorage} = getState().content;
    const {
        statusTrustingStellarAsset,
        statusStellarTokenTrusted,
        errorTrustingStellarAsset
    } = strings;

    dispatch({
        type: LOADING,
        payload: statusTrustingStellarAsset,
    });


    try {
        if (!localStorage.wolloTrusted) {
            const asset = new Asset(Config.STELLAR_TOKEN_CODE, Config.STELLAR_TOKEN_ISSUER);
            await trustAsset(stellar.sk, asset);
            dispatch({
                type: LOADING,
                payload: statusStellarTokenTrusted,
            });

            dispatch({
                type: LOCAL_STORAGE,
                payload: {
                    wolloTrusted: true,
                }
            });
        }

        dispatch(claim());

    } catch (e) {
        console.log(e);
        dispatch({
            type: ERROR,
            payload: errorTrustingStellarAsset,
        });

        // setTimeout(dispatch, 6000, {type: LOADING, payload: null});
    }


};
