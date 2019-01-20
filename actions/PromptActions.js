export const handleNameChanged = payload => ({
    type: 'HANDLE_PROMPT_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_PROMPT_DESCRIPTION_CHANGED',
    payload,
});

export const openConfirmation = payload => ({
    type: 'OPEN_PROMPT_CONFIRMATION',
    payload,
});

export const closeConfirmation = () => ({
    type: 'CLOSE_PROMPT_CONFIRMATION',
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
