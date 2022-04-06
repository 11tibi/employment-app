import React from 'react';
import {Button} from "@mui/material";
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {MenuItem, ListItemIcon} from '@mui/material';
import {Logout as LogoutIcon} from '@mui/icons-material';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        dispatch({type: 'SET_USER_DEFAULT'});
        navigate('/login/');
    }

    return (
        <>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small"/>
                </ListItemIcon>
                Logout
            </MenuItem>
        </>
        // <Button
        //     color='inherit'
        //     onClick={handleLogout}
        // >
        //     Logout
        // </Button>
    )
}

export default Logout;
