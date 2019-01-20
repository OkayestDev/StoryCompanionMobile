import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    creatingPrompt: false,
    prompt: null,
    isConfirmationModalOpen: false,
    confirmationTitle: '',
    confirmationNote: '',
    confirmationOnConfirm: null,
};

export const promptReducer = (state = INITIAL_STATE, action) => {
    let newState = state;

    switch (action.type) {
        case 'HANDLE_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.description,
            };
            break;
        case 'OPEN_CONFIRMATION':
            let payload = action.payload;
            newState = {
                ...state,
                isConfirmationModalOpen: true,
                confirmationTitle: payload.title,
                confirmationNote: payload.note,
                confirmationOnConfirm: payload.onConfirm,
            };
            break;
        case 'CLOSE_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: false,
            };
            break;
        case 'NEW_PROMPT':
            newState = {
                ...state,
                creatingPrompt: 'new',
            };
        case 'RESET_PROMPT':
            newState = {
                ...state,
                description: '',
                name: '',
                creatingPrompt: false,
            };
            break;
        case 'SET_PROMPT':
            newState = {
                ...state,
                prompt: action.payload,
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};

export const promptStore = createStore(promptReducer);
