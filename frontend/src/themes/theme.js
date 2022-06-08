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
        text: {
            main: '#000000',
        },
        paper: {
            main: '#efefef',
        },
    },
    typography: {
        "fontFamily": `"Noto Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`,
        "text": {
            "fontSize": 25,
        },
        "textBold": {
            "fontSize": 18,
            "fontWeight": "bold",
        },
        "textSmall": {
            "fontSize": 15,
        },
        "textGrey": {
            "fontSize": 18,
            color: "#6f6f6f",
        },
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
        text: {
            main: '#e1e1e1',
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
