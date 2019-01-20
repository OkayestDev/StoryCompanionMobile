export const handleNameChanged = payload => ({
    type: 'HANDLE_STORY_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_STORY_DESCRIPTION_CHANGED',
    payload,
});

export const handleImageChanged = payload => ({
    type: 'HANDLE_STORY_IMAGE_CHANGED',
    payload,
});

export const handleTagChanged = payload => ({
    type: 'HANDLE_STORY_TAG_CHANGED',
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
    type: 'OPEN_STORY_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_STORY_CONFIRMATION',
});
