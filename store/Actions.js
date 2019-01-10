export default (Actions = {
    mapStateToProps: function mapStateToProps(state) {
        return {
            ...state,
        };
    },
    mapDispatchToProps: function mapDispatchToProps(dispatch) {
        return {
            login: payload =>
                dispatch({
                    type: 'LOGIN',
                    payload: payload,
                }),
            setStories: payload =>
                dispatch({
                    type: 'SET_STORIES',
                    payload: payload,
                }),
            editStoryComponents: payload =>
                dispatch({
                    type: 'EDIT_COMPONENTS',
                    payload: payload,
                }),
            setTags: payload =>
                dispatch({
                    type: 'SET_TAGS',
                    payload: payload,
                }),
            setPrompt: payload =>
                dispatch({
                    type: 'SET_PROMPT',
                    payload: payload,
                }),
            logout: () => dispatch({ type: 'LOGOUT' }),
        };
    },
});
