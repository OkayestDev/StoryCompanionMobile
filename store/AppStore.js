import { createStore } from 'redux';
import { LOGS } from '../config/Logs.js';

const INITIAL_STATE = {
    apiKey: null,
    email: null,
    userId: null,
    selectedStoryId: null,
    stories: null,
    chapters: null,
    tags: null,
    plots: null,
    characters: null,
}

const reducer = (state = INITIAL_STATE, action) => {
    if (LOGS.ENABLE_LOGS) {
        console.info("Updating AppStore: ", {
            state: state,
            action: action,
        });
    }
    let newState = state;
    switch (action.type) {
        case "LOGIN":
            newState = {
                ...state,
                apiKey: action.payload.apiKey,
                email: action.payload.email,
                userId: action.payload.id,
            };
            break;
        case "SET_STORIES":
            newState = {
                ...state,
                stories: action.payload,
            }
            break;
        case "EDIT_COMPONENTS":
            newState = {
                ...state,
                selectedStoryId: action.payload
            };
            break;
        case "SET_TAGS":
            newState = {
                ...state,
                tags: action.payload
            };
            break;
    }
    // @TODO Set storage persist here?
    return newState;
}

export default AppStore = createStore(reducer);