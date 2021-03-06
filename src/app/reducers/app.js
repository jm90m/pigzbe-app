import {
    APP_CONNECTION_STATUS,
    APP_ADD_ALERT,
    APP_DELETE_ALERT,
    APP_STAY_LOGGED_IN,
    APP_MINIMIZED
} from '../actions';

const initialState = {
    minimized: false,
    isConnected: true,
    stayLoggedIn: false,
    alertType: null,
    alertMessage: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            };
        case APP_ADD_ALERT:
            return {
                ...state,
                alertType: action.alertType,
                alertMessage: action.alertMessage,
            };
        case APP_DELETE_ALERT:
            return {
                ...state,
                alertType: null,
                alertMessage: null,
            };
        case APP_STAY_LOGGED_IN:
            return {
                ...state,
                stayLoggedIn: action.value
            };
        case APP_MINIMIZED:
            return {
                ...state,
                minimized: action.value
            };
        default:
            return state;
    }
};
