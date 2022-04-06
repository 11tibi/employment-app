import {createTheme} from '@mui/material/styles';

const light = {
    palette: {
        type: 'light',
        background: {
            default: '#DEE4E7',
            paper: '#efefef',
        },
        primary: {
            main: '#217CA3',
        },
        secondary: {
            main: '#E29930',
        },
        navbar: {
            main: '#32384D',
        },
        error: {
            main: '#A43820',
        },
        dark: {
            main: '#2d2d2d',
        },
        paper: {
            main: '#efefef',
        },
    },
    typography: {
        "fontFamily": `"Noto Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`,
    },
};

const dark = {
    palette: {
        type: 'dark',
        background: {
            default: '#050309',
            contrastText: "#f6f6f6",
            paper: '#110c1a'
        },
        text: {
            primary: '#e1e1e1',
        },
        primary: {
            main: '#041C32',
        },
        secondary: {
            main: '#064663',
        },
        green: {
            main: '#04293A'
        },
        navbar: {
            main: '#041C32',
        },
        error: {
            main: '#801313',
        },
        paper: {
            main: '#110c1a',
        },
    },
    typography: {
        "fontFamily": `"Noto Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`,
    },
};

function theme(mode) {
    if (mode === 'light') {
        return createTheme(light);
    } else if (mode === 'dark') {
        return createTheme(dark);
    }
}

export default theme;
