const initialState = {
    is_authenticated: false,
    id: -1,
    email: '',
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'SET_AUTHENTICATION':
            return {
                ...state,
                is_authenticated: action.payload,
            };
        case 'SET_USER_DEFAULT':
            return { ...initialState };
        default:
            return state;
    }
}

export default user;
