import React, {useState} from 'react';
import {IconButton} from '@mui/material';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import {useDispatch} from "react-redux";

const Theme = () => {
    const dispatch = useDispatch();

    const handleTheme = () => {
        dispatch({ type: 'SET_THEME' });
    }

    return (
        <IconButton aria-label="theme" onClick={handleTheme}>
            <BrightnessMediumIcon/>
        </IconButton>
    );
}

export default Theme;
