import React, {useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem, Divider} from '@mui/material';
import Logout from './Logout';
import {useNavigate} from "react-router-dom";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ml: 2}}
                aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
                <Avatar sx={{width: 32, height: 32}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                PaperProps={{
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: '50%',
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem onClick={() => {navigate('/employee/resume/editor/')}}>
                    <Avatar/> Profile
                </MenuItem>
                <MenuItem onClick={() => {navigate('/employer-dash/')}}>
                    Dashboard Angajator
                </MenuItem>
                <Divider />
                <Logout />
            </Menu>
        </>
    );
}

export default UserMenu;
