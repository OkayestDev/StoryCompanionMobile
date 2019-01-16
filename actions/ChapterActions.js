export const handleContentChanged = payload => ({
    type: 'HANDLE_CONTENT_CHANGED',
    payload,
});

export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleNumberChanged = payload => ({
    type: 'HANDLE_NUMBER_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const newChapter = () => ({
    TYPE: 'NEW_CHAPTER',
});

export const selectChapter = id => ({
    TYPE: 'SELECT_CHAPTER',
    payload: id,
});

export const selectChapterToWriteContent = id => ({
    TYPE: 'SELECT_CHAPTER_TO_WRITE_CONTENT',
    payload: id,
});

export const resetChapter = () => ({
    TYPE: 'RESET_CHAPTER',
});

export const setChapters = payload => ({
    TYPE: 'SET_CHAPTERS',
    payload,
});

export const openConfirmation = () => ({
    TYPE: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    TYPE: 'CLOSE_CONFIRMATION',
});
