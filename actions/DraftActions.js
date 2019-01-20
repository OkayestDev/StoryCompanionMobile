export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_DRAFT_DESCRIPTION_CHANGED',
    payload,
});

export const setDraft = payload => ({
    type: 'SET_DRAFT',
    payload,
});
