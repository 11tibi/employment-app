import React, {useEffect} from 'react';
import Router from './components/router/Router';
import FetchUser from './utils/FetchUser';
import {ThemeProvider} from '@mui/material/styles';
import theme from './themes/theme';
import {useSelector} from "react-redux";
import {CssBaseline} from '@mui/material';

function App() {
    const theme_state = useSelector((state) => state?.theme);
    useEffect(() => {
        FetchUser();
    })

    return (
        <ThemeProvider theme={
            (theme_state?.light === true) ?
                theme('light') :
                theme('dark')
        }>
            <CssBaseline />
            <Router/>
        </ThemeProvider>
    );
}

export default App;
