export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    };
}

export const setAuthentication = (is_authenticated) => {
    return {
        type: 'SET_AUTHENTICATION',
        payload: is_authenticated,
    }
};

export const setUserDefault = () => {
    return {
        type: 'SET_USER_DEFAULT',
    }
};
