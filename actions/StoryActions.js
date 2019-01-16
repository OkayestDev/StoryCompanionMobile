export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const handleImageChanged = payload => ({
    type: 'HANDLE_IMAGE_CHANGED',
    payload,
});

export const handleTagChanged = payload => ({
    type: 'HANDLE_TAG_CHANGED',
    payload,
});

export const resetStory = () => ({
    type: 'RESET_STORY',
});

export const newStory = () => ({
    type: 'NEW_STORY',
});

export const selectStory = id => ({
    type: 'SELECT_STORY',
    payload: id,
});

export const setStories = payload => ({
    type: 'SET_STORIES',
    payload,
});

export const openConfirmation = () => ({
    type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});
