import { createStore } from 'redux';

const INITIAL_STATE = {
    selectedTagId: null,
    name: '',
    description: '',
    type: '',
    tags: null,
    isConfirmationModalOpen: false,
};

export const tagReducer = (state = INITIAL_STATE, action) => {
    let newState = state;

    switch (action.type) {
        case 'HANDLE_TAG_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_TAG_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'HANDLE_TAG_TYPE_CHANGED':
            newState = {
                ...state,
                type: action.payload,
            };
            break;
        case 'RESET_TAG':
            newState = {
                ...state,
                selectedTagId: null,
                name: '',
                description: '',
                type: '',
            };
            break;
        case 'SELECT_TAG':
            let id = action.payload;
            console.info(state);
            newState = {
                ...state,
                selectedTagId: id,
                name: state.tags[id].name,
                description: state.tags[id].description,
                type: state.tags[id].type,
            };
            break;
        case 'SET_TAGS':
            newState = {
                ...state,
                tags: action.payload,
            };
            break;
        case 'NEW_TAG':
            newState = {
                ...state,
                selectedTagId: 'new',
            };
            break;
        case 'OPEN_TAG_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_TAG_CONFIRMATION':
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

export const tagStore = createStore(tagReducer);
