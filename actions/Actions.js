export const login = payload => ({
    type: 'LOGIN',
    payload,
});

export const showAlert = (message, type) => ({
    type: 'SHOW_ALERT',
    payload: {
        message,
        type,
    },
});

export const closeAlert = () => ({
    type: 'CLOSE_ALERT',
});

export const logout = () => ({ type: 'LOGOUT' });
