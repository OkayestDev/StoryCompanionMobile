import { createStore } from 'redux';
import { LOGS } from '../config/Logs.js';

const INITIAL_STATE = {
    name: '',
    number: '',
    description: '',
    content: '',
    chapters: null,
    selectedChapterId: null,
    isWritingChapter: false,
    isConfirmationModalOpen: false,
};

const chapterReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_CONTENT_CHANGED':
            newState = {
                ...state,
                content: action.payload,
            };
            break;
        case 'HANDLE_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_NUMBER_CHANGED':
            newState = {
                ...state,
                number: action.payload,
            };
            break;
        case 'HANDLE_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'NEW_CHAPTER':
            newState = {
                ...state,
                selectedChapterId: 'new',
            };
            break;
        case 'SELECT_CHAPTER':
            let id = action.payload;
            newState = {
                ...state,
                selectedChapterId: id,
                name: this.state.chapters[id].name,
                number: String(this.state.chapters[id].number),
                description: this.state.chapters[id].description,
                content: this.state.chapters[id].content,
            };
            break;
        case 'SELECT_CHAPTER_TO_WRITE_CONTENT':
            let id = action.payload;
            newState = {
                ...state,
                selectedChapterId: id,
                name: this.state.chapters[id].name,
                number: String(this.state.chapters[id].number),
                description: this.state.chapters[id].description,
                content: this.state.chapters[id].content,
                isWritingChapter: true,
            };
            break;
        case 'RESET_CHAPTER':
            newState = {
                ...state,
                description: '',
                name: '',
                number: '',
                content: '',
                selectedChapterId: null,
                isWritingChapter: false,
            };
            break;
        case 'SET_CHAPTERS':
            newState = {
                ...state,
                chapters: action.payload,
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
        console.info('Updating ChapterStore: ', {
            state: newState,
            action: action,
        });
    }

    return newState;
};

export const chapterStore = createStore(chapterReducer);
