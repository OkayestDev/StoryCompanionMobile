import { AsyncStorage } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { chapterStore } from './ChapterStore.js';
import { promptStore } from './PromptStore.js';
import { storyStore } from './StoryStore.js';
import { characterStore } from './CharacterStore.js';
import { draftStore } from './DraftStore.js';
import { noteStore } from './NoteStore.js';
import { tagStore } from './TagStore.js';
import { plotStore } from './PlotStore.js';
import { settingsStore } from './SettingsStore.js';
import { LOGS } from '../config/Logs.js';

/**
 * Changing key will cause the storage to be reset
 */
const PERSIST_CONFIG = {
    key: '1.0.0',
    storage: AsyncStorage,
};

const INITIAL_STATE = {
    apiKey: null,
    email: null,
    userId: null,
    globalAlertVisible: false,
    globalAlertType: '',
    globalAlertMessage: '',
};

const reducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'LOGIN':
            newState = {
                ...state,
                apiKey: action.payload.apiKey,
                email: action.payload.email,
                userId: action.payload.id,
            };
            break;
        case 'LOGOUT':
            newState = INITIAL_STATE;
            break;
        case 'SHOW_ALERT':
            newState = {
                ...state,
                globalAlertVisible: true,
                globalAlertType: action.type,
                globalAlertMessage: action.message,
            };
            break;
        case 'CLOSE_ALERT':
            newState = {
                ...state,
                globalAlertVisible: false,
            };
            break;
    }

    if (LOGS.ENABLE_LOGS) {
        console.info('Updating AppStore: ', {
            state: newState,
            action: action,
        });
    }

    return newState;
};

const reducers = combineReducers({
    ...reducer,
    storyStore,
    tagStore,
    promptStore,
    characterStore,
    chapterStore,
    draftStore,
    noteStore,
    plotStore,
    settingsStore,
});

const persistedReducer = persistReducer(PERSIST_CONFIG, reducers);

export const AppStore = createStore(persistedReducer);
export const Persistor = persistStore(AppStore);
