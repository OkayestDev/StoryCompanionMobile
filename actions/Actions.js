export const login = payload => ({
    type: 'LOGIN',
    payload,
});
export const setStories = payload => ({
    type: 'SET_STORIES',
    payload,
});
export const editStoryComponents = payload => ({
    type: 'EDIT_COMPONENTS',
    payload,
});
export const setTags = payload => ({
    type: 'SET_TAGS',
    payload,
});
export const setPrompt = payload => ({
    type: 'SET_PROMPT',
    payload,
});
export const showAlert = (message, type) => ({
    type: 'SHOW_ALERT',
    message,
    type,
})
export const logout = () => ({ type: 'LOGOUT' });
