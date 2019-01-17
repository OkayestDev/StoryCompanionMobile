export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const handleTypeChanged = payload => ({
    type: 'HANDLE_TYPE_CHANGED',
    payload,
});

export const resetTag = () => ({
    type: 'RESET_TAG',
});

export const selectTag = id => ({
    type: 'SELECT_TAG',
    payload: id,
});

export const newTag = () => ({
    type: 'NEW_TAG',
});

export const openConfirmation = () => ({
    type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});
