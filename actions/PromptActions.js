export const handleNameChanged = payload => ({
    type: 'HANDLE_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const openConfirmation = payload => ({
    type: 'OPEN_CONFIRMATION',
    payload,
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});

export const newPrompt = () => ({
    type: 'NEW_PROMPT',
});

export const resetPrompt = () => ({
    type: 'RESET_PROMPT',
});

export const setPrompt = payload => ({
    type: 'SET_PROMPT',
    payload,
});
