export const handleContentChanged = payload => ({
    type: 'HANDLE_CHAPTER_CONTENT_CHANGED',
    payload,
});

export const handleNameChanged = payload => ({
    type: 'HANDLE_CHAPTER_NAME_CHANGED',
    payload,
});

export const handleNumberChanged = payload => ({
    type: 'HANDLE_CHAPTER_NUMBER_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_CHAPTER_DESCRIPTION_CHANGED',
    payload,
});

export const newChapter = () => ({
    type: 'NEW_CHAPTER',
});

export const selectChapter = id => ({
    type: 'SELECT_CHAPTER',
    payload: id,
});

export const selectChapterToWriteContent = id => ({
    type: 'SELECT_CHAPTER_TO_WRITE_CONTENT',
    payload: id,
});

export const resetChapter = () => ({
    type: 'RESET_CHAPTER',
});

export const setChapters = payload => ({
    type: 'SET_CHAPTERS',
    payload,
});

export const openConfirmation = () => ({
    type: 'OPEN_CHAPTER_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CHAPTER_CONFIRMATION',
});
