import { createStore } from 'redux';
import { LOGS } from '../config/Logs.js';

const INITIAL_STATE = {
    name: '',
    description: '',
    notes: null,
    selectedNoteId: null,
    isConfirmationModalOpen: false,
};

const noteReducer = (state = INITIAL_STATE, action) => {
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
        case 'RESET_NOTE':
            newState = {
                ...state,
                name: '',
                description: '',
                selectedNoteId: null,
            };
            break;
        case 'SET_NOTES':
            newState = {
                ...state,
                notes: action.payload,
            };
            break;
        case 'SELECT_NOTE':
            let note = state.notes[action.payload];
            newState = {
                ...state,
                name: note.name,
                description: note.description,
                selectedNoteId: action.payload,
            };
            break;
        case 'NEW_NOTE':
            newState = {
                ...state,
                selectedNoteId: 'new',
            };
            break;
        case 'OPEN_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: false,
            };
            break;
        case 'CLOSE_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
    }

    if (LOGS.ENABLE_LOGS) {
        console.info('Updating NoteStore: ', {
            state: newState,
            action: action,
        });
    }

    return newState;
};

export const noteStore = createStore(noteReducer);
