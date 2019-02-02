import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    attribute: '',
    image: '',
    age: 0,
    storyRole: '',
    goal: '',
    number: 0,
    characters: null,
    selectedCharacterId: null,
    selectedTagId: null,
    isConfirmationModalOpen: false,
};

export const characterReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_CHARACTER_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_GOAL_CHANGED':
            newState = {
                ...state,
                goal: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_AGE_CHANGED':
            newState = {
                ...state,
                age: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_STORY_ROLE_CHANGED':
            newState = {
                ...state,
                storyRole: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_ATTRIBUTE_CHANGED':
            newState = {
                ...state,
                attribute: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_IMAGE_CHANGED':
            newState = {
                ...state,
                image: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_NUMBER_CHANGED':
            newState = {
                ...state,
                number: action.payload,
            };
            break;
        case 'HANDLE_CHARACTER_TAG_CHANGED':
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
                age: character.age,
                goal: character.goal,
                storyRole: character.storyRole,
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
                age: '',
                storyRole: '',
                goal: '',
                selectedTagId: null,
                selectedCharacterId: null,
            };
            break;
        case 'NEW_CHARACTER':
            newState = {
                ...state,
                selectedCharacterId: 'new',
            };
            break;
        case 'SET_CHARACTERS':
            newState = {
                ...state,
                characters: action.payload,
            };
            break;
        case 'OPEN_CHARACTER_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_CHARACTER_CONFIRMATION':
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
