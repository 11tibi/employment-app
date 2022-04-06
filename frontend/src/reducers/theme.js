let initialState = {
    light: true,
};

if (localStorage.getItem('light_theme') === null) {
    localStorage.setItem('light_theme', 'true');
    initialState.light = true
} else {
    initialState.light = localStorage.getItem('light_theme') === 'true';
}

const themes = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            let theme_state = !state.light;
            localStorage.setItem('light_theme', theme_state.toString());
            return {light: theme_state};
        default:
            return state;
    }
}

export default themes;
