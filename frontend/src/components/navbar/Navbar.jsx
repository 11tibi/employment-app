import React, {useState} from 'react';
import {AppBar, Toolbar, Box, Typography, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import EmployerBtn from './EmployerBtn';
import UserMenu from './UserMenu';
import Theme from '../theme/Theme';

let Navbar = () => {
    const user = useSelector((state) => state?.user);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color='navbar'>
                <Toolbar style={{minHeight: '50px'}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Home
                    </Typography>
                    { user.is_authenticated === true ?
                        null :
                        <>
                            <Button color="inherit" component={Link} to="/login/">Login</Button>
                        </>}
                        <Theme />
                        <UserMenu />
                        <EmployerBtn />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
