import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import EmployerBtn from './EmployerBtn';
import UserMenu from './UserMenu';
import Theme from '../theme/Theme';
import MenuIcon from '@mui/icons-material/Menu';

let Navbar = (props) => {
    const user = useSelector((state) => state?.user);

    const [mobileOpen, setMobileOpen] = useState(false);

    const {window} = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color='navbar'>
                <Toolbar style={{minHeight: '50px'}}>
                    <Typography variant="h6" component="div">
                        Home
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleDrawerToggle}
                        color="inherit"
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box component={'nav'}>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                            }}
                        >
                            <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
                                <Box my={4}>
                                    <Button color={'inherit'} component={Link} to={'/find-job/'}>
                                        Cautați un loc de muncă
                                    </Button>
                                    {user.is_authenticated === true ? null :
                                        <>
                                            <Button color="inherit" component={Link} to="/login/">Login</Button>
                                        </>}
                                    <EmployerBtn/>
                                    <UserMenu/>
                                    <Theme/>
                                </Box>
                            </Box>
                        </Drawer>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, mx: 3}}>
                        <Button color={'inherit'} component={Link} to={'/find-job/'}>
                            Cautați un loc de muncă
                        </Button>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {user.is_authenticated === true ?
                            null :
                            <>
                                <Button color="inherit" component={Link} to="/login/">Login</Button>
                            </>}
                        <Theme/>
                        <UserMenu/>
                        <EmployerBtn/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
