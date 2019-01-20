import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    attribute: '',
    image: '',
    number: 0,
    characters: null,
    selectedCharacterId: null,
    selectedTagId: null,
    isConfirmationModalOpen: false,
};

export const characterReducer = (state = INITIAL_STATE, action) => {
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
                description: action.payload,
            };
            break;
        case 'HANDLE_ATTRIBUTE_CHANGED':
            newState = {
                ...state,
                attribute: action.payload,
            };
            break;
        case 'HANDLE_IMAGE_CHANGED':
            newState = {
                ...state,
                image: action.payload,
            };
            break;
        case 'HANDLE_NUMBER_CHANGED':
            newState = {
                ...state,
                number: action.payload,
            };
            break;
        case 'HANDLE_TAG_CHANGED':
            newState = {
                ...state,
                selectedTagId: action.payload,
            };
            break;
        case 'SELECT_CHARACTER':
            let character = state.characters[action.payload];
            newState = {
                ...state,
                selectedCharacterId: action.payload,
                name: character.name,
                description: character.description,
                attribute: character.attribute,
                image: character.image,
                number: character.number,
                selectedTagId: character.tag,
            };
            break;
        case 'RESET_CHARACTER':
            newState = {
                ...state,
                name: '',
                description: '',
                attribute: '',
                image: '',
                number: 0,
                selectedTagId: null,
                selectedCharacterId: null,
            };
            break;
        case 'NEW_CHAPTER':
            newState = {
                ...state,
                selectedCharacterId: 'new',
            };
            break;
        case 'SET_CHARACTER':
            newState = {
                ...state,
                characters: action.payload,
            };
            break;
        case 'OPEN_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_CONFIRMATION':
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

export const characterStore = createStore(characterReducer);
