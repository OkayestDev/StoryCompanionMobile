export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DESCRIPTION_CHANGED',
    payload,
});

export const handlePasswordChange = payload => ({
    type: 'HANDLE_PASSWORD_CHANGED',
    payload,
});

export const handleConfirmPasswordChange = payload => ({
    type: 'HANDLE_CONFIRM_PASSWORD_CHANGED',
    payload,
});

export const submittingFeature = () => ({
    type: 'SUBMITTING_FEATURE',
});

export const submittingBug = () => ({
    type: 'SUBMITTING_BUG',
});

export const changingPassword = () => ({
    type: 'CHANGING_PASSWORD',
});

export const resetSettings = () => ({
    type: 'RESET_SETTINGS',
});

export const openConfirmation = () => ({
    type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_CONFIRMATION',
});
