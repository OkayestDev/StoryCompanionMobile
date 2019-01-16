import { createStore } from 'redux';
import { LOGS } from '../config/Logs.js';

const INITIAL_STATE = {
    name: '',
    description: '',
    image: '',
    selectedTagId: null,
    selectedStoryId: null,
    stories: null,
    isConfirmationModalOpen: false,
};

const storyReducer = (state = INITIAL_STATE, action) => {
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
        case 'HANDLE_IMAGE_CHANGED':
            newState = {
                ...state,
                image: action.payload,
            };
            break;
        case 'HANDLE_TAG_CHANGED':
            newState = {
                ...state,
                selectedTagId: action.payload,
            };
            break;
        case 'RESET_STORY':
            newState = {
                ...state,
                name: '',
                description: '',
                image: '',
                selectedTagId: null,
                selectedStoryId: null,
            };
            break;
        case 'SELECT_STORY':
            newState = {
                ...state,
                selectedStoryId: 'new',
            };
            break;
        case 'SET_STORIES':
            newState = {
                ...state,
                stories: action.payload,
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
    }

    if (LOGS.ENABLE_LOGS) {
        console.info('Updating StoryStore: ', {
            state: newState,
            action: action,
        });
    }

    return newState;
};

export const storyStore = createStore(storyReducer);
