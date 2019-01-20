import { createStore } from 'redux';

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

export const chapterReducer = (state = INITIAL_STATE, action) => {
    let id = null;
    let newState = state;

    switch (action.type) {
        case 'HANDLE_CHAPTER_CONTENT_CHANGED':
            newState = {
                ...state,
                content: action.payload,
            };
            break;
        case 'HANDLE_CHAPTER_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_CHAPTER_NUMBER_CHANGED':
            newState = {
                ...state,
                number: action.payload,
            };
            break;
        case 'HANDLE_CHAPTER_DESCRIPTION_CHANGED':
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
            id = action.payload;
            newState = {
                ...state,
                selectedChapterId: id,
                name: state.chapters[id].name,
                number: String(state.chapters[id].number),
                description: state.chapters[id].description,
                content: state.chapters[id].content,
            };
            break;
        case 'SELECT_CHAPTER_TO_WRITE_CONTENT':
            id = action.payload;
            newState = {
                ...state,
                selectedChapterId: id,
                name: state.chapters[id].name,
                number: String(state.chapters[id].number),
                description: state.chapters[id].description,
                content: state.chapters[id].content,
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
        case 'OPEN_CHAPTER_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_CHAPTER_CONFIRMATION':
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

export const chapterStore = createStore(chapterReducer);
