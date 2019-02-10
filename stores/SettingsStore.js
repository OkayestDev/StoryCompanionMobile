import { createStore } from 'redux';

const INITIAL_STATE = {
    isConfirmationModalOpen: false,
    isSubmittingBug: false,
    isSubmittingFeature: false,
    description: '',
    isChangingPassword: false,
    isChangingEmail: false,
    password: '',
    confirmPassword: '',
    newEmail: '',
    confirmEmail: '',
};

export const settingsReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_SETTINGS_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'HANDLE_SETTINGS_PASSWORD_CHANGED':
            newState = {
                ...state,
                password: action.payload,
            };
            break;
        case 'HANDLE_SETTINGS_CONFIRM_PASSWORD_CHANGED':
            newState = {
                ...state,
                confirmPassword: action.payload,
            };
            break;
        case 'HANDLE_NEW_EMAIL_CHANGED':
            newState = {
                ...state,
                newEmail: action.payload,
            };
            break;
        case 'HANDLE_CONFIRM_EMAIL_CHANGED':
            newState = {
                ...state,
                confirmEmail: action.payload,
            };
            break;
        case 'SUBMITTING_FEATURE':
            newState = {
                ...state,
                isSubmittingFeature: true,
            };
            break;
        case 'SUBMITTING_BUG':
            newState = {
                ...state,
                isSubmittingBug: true,
            };
            break;
        case 'CHANGING_PASSWORD':
            newState = {
                ...state,
                isChangingPassword: true,
            };
            break;
        case 'CHANGING_EMAIL':
            newState = {
                ...state,
                isChangingEmail: true,
            };
            break;
        case 'RESET_SETTINGS':
            newState = INITIAL_STATE;
            break;
        case 'OPEN_SETTINGS_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_SETTINGS_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: false,
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};

export const settingsStore = createStore(settingsReducer);
