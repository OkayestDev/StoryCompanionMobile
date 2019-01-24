import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    creatingPrompt: false,
    prompt: null,
    updatedAt: null,
    isConfirmationModalOpen: false,
    confirmationTitle: '',
    confirmationNote: '',
    confirmationOnConfirm: null,
};

export const promptReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_PROMPT_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_PROMPT_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'OPEN_PROMPT_CONFIRMATION':
            let payload = action.payload;
            newState = {
                ...state,
                isConfirmationModalOpen: true,
                confirmationTitle: payload.title,
                confirmationNote: payload.note,
                confirmationOnConfirm: payload.onConfirm,
            };
            break;
        case 'CLOSE_PROMPT_CONFIRMATION':
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
            break;
        case 'RESET_PROMPT':
            newState = {
                ...state,
                description: '',
                name: '',
                creatingPrompt: false,
            };
            break;
        case 'SET_PROMPT':
            let now = new Date();
            newState = {
                ...state,
                prompt: action.payload,
                updatedAt: now.getTime(),
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};

export const promptStore = createStore(promptReducer);
