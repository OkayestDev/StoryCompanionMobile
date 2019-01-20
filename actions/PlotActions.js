export const handleNameChanged = payload => ({
    type: 'HANDLE_PLOT_NAME_CHANGED',
    payload,
});

export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_PLOT_DESCRIPTION_CHANGED',
    payload,
});

export const resetPlot = () => ({
    type: 'RESET_PLOT',
});

export const newPlot = () => ({
    type: 'NEW_PLOT',
});

export const selectPlot = id => ({
    type: 'SELECT_PLOT',
    payload: id,
});

export const setPlots = payload => ({
    type: 'SET_PLOTS',
    payload,
});

export const addChildPlot = parentId => ({
    type: 'ADD_CHILD_PLOT',
    payload: parentId,
});

export const openConfirmation = () => ({
    type: 'OPEN_PLOT_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_PLOT_CONFIRMATION',
});
