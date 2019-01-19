export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleAttributeChanged = payload => ({
    type: 'HANDLE_ATTRIBUTE_CHANGED',
    payload,
});

export const handleImageChanged = payload => ({
    type: 'HANDLE_IMAGE_CHANGED',
    payload,
});

export const handleNumberChanged = payload => ({
    type: 'HANDLE_NUMBER_CHANGED',
    payload,
});

export const handleTagChanged = id => ({
    type: 'HANDLE_TAG_CHANGED',
    payload: id,
});

export const selectCharacter = id => ({
    type: 'SELECT_CHARACTER',
    payload: id,
});

export const resetCharacter = () => ({
    type: 'RESET_CHARACTER',
});

export const newCharacter = () => ({
    type: 'NEW_CHARACTER',
});

export const setCharacters = payload => ({
    type: 'SET_CHARACTERS',
    payload,
});

export const openConfirmation = () => ({
    type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});
