import { createStore } from 'redux';
import { LOGS } from '../config/Logs.js';

const INITIAL_STATE = {
    description: '',
    selectedDraftId: '',
    draft: null,
};

const draftReducer = (state = INITIAL_STATE, action) => {
    let newState = state;

    switch (action.type) {
        case 'HANDLE_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'SET_DRAFT':
            newState = {
                ...state,
                draft: action.payload,
                description:
                    'description' in action.payload
                        ? action.payload.description
                        : state.description,
                selectedDraftId: 'id' in action.payload ? action.payload.id : state.selectedDraftId,
            };
    }

    if (LOGS.ENABLE_LOGS) {
        console.info('Updating DraftStore: ', {
            state: newState,
            action: action,
        });
    }

    return newState;
};

export const draftStore = createStore(draftReducer);
