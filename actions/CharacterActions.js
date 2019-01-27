export const handleNameChanged = payload => ({
    type: 'HANDLE_CHARACTER_NAME_CHANGED',
    payload,
});

export const handleAgeChanged = payload => ({
    type: 'HANDLE_CHARACTER_AGE_CHANGED',
    payload,
});

export const handleStoryRoleChanged = payload => ({
    type: 'HANDLE_CHARACTER_STORY_ROLE_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_CHARACTER_DESCRIPTION_CHANGED',
    payload,
});

export const handleGoalChanged = payload => ({
    type: 'HANDLE_CHARACTER_GOAL_CHANGED',
    payload,
});

export const handleAttributeChanged = payload => ({
    type: 'HANDLE_CHARACTER_ATTRIBUTE_CHANGED',
    payload,
});

export const handleImageChanged = payload => ({
    type: 'HANDLE_CHARACTER_IMAGE_CHANGED',
    payload,
});

export const handleNumberChanged = payload => ({
    type: 'HANDLE_CHARACTER_NUMBER_CHANGED',
    payload,
});

export const handleTagChanged = id => ({
    type: 'HANDLE_CHARACTER_TAG_CHANGED',
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
    type: 'OPEN_CHARACTER_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CHARACTER_CONFIRMATION',
});
