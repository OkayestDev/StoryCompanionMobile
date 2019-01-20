export const handleNameChanged = payload => ({
    type: 'HANDLE_TAG_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_TAG_DESCRIPTION_CHANGED',
    payload,
});

export const handleTypeChanged = payload => ({
    type: 'HANDLE_TAG_TYPE_CHANGED',
    payload,
});

export const resetTag = () => ({
    type: 'RESET_TAG',
});

export const selectTag = id => ({
    type: 'SELECT_TAG',
    payload: id,
});

export const setTags = payload => ({
    type: 'SET_TAGS',
    payload: payload,
});

export const newTag = () => ({
    type: 'NEW_TAG',
});

export const openConfirmation = () => ({
    type: 'OPEN_TAG_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_TAG_CONFIRMATION',
});
