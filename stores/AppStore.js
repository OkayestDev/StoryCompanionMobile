import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import { chapterReducer } from './ChapterStore.js';
import { promptReducer } from './PromptStore.js';
import { storyReducer } from './StoryStore.js';
import { characterReducer } from './CharacterStore.js';
import { draftReducer } from './DraftStore.js';
import { noteReducer } from './NoteStore.js';
import { tagReducer } from './TagStore.js';
import { plotReducer } from './PlotStore.js';
import { settingsReducer } from './SettingsStore.js';
import logger from 'redux-logger';

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
            purgeStoredState(PERSIST_CONFIG);
            newState = INITIAL_STATE;
            break;
        case 'SHOW_ALERT':
            newState = {
                ...state,
                globalAlertVisible: true,
                globalAlertType: action.payload.type,
                globalAlertMessage: action.payload.message,
            };
            break;
        case 'CLOSE_ALERT':
            newState = {
                ...state,
                globalAlertVisible: false,
            };
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};

const reducers = combineReducers({
    appStore: reducer,
    storyStore: storyReducer,
    tagStore: tagReducer,
    promptStore: promptReducer,
    characterStore: characterReducer,
    chapterStore: chapterReducer,
    draftStore: draftReducer,
    noteStore: noteReducer,
    plotStore: plotReducer,
    settingsStore: settingsReducer,
});

const persistedReducer = persistReducer(PERSIST_CONFIG, reducers);

export const AppStore = createStore(persistedReducer, applyMiddleware(logger));
export const Persistor = persistStore(AppStore);
