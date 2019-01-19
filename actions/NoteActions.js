export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const resetNote = () => ({
    type: 'RESET_NOTE',
});

export const setNotes = payload => ({
    type: 'SET_NOTES',
    payload,
});

export const selectNote = payload => ({
    type: 'SELECT_NOTE',
    payload,
});

export const newNote = () => ({
    type: 'NEW_NOTE',
});

export const openConfirmation = () => ({
    type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});
