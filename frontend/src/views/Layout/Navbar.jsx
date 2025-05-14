import * as React from 'react';
// function
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, reset } from '../../features/authSlice'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
// icons
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import RegIcon from '@mui/icons-material/AppRegistrationOutlined';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(Logout());
        dispatch(reset());
        navigate("/");
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#0F1158', boxShadow: 'none', padding: '10px' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap sx={{ display: { xs: 'none', md: 'flex' }, fontFamily: 'Cal Sans', fontWeight: 400, color: '#F6F1DE' }}>
                        Intelligentsia Guild
                    </Typography>
                    <Box>
                        <Tooltip title="Account settings">
                            <IconButton onClick={handleClick} size="small">
                                <Avatar sx={{ bgcolor: '#FFDB00' }}>A</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                elevation: 4,
                                sx: {
                                    mt: 1.5,
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: '#fff',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            {user && (
                                <div>
                                    <Typography component='a' href='/profile' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                        <MenuItem onClick={handleClose}>
                                            <Avatar /> Profil
                                        </MenuItem>
                                    </Typography>
                                    <Typography component='a' onClick={logout} sx={{ textDecoration: 'none', color: '#61677A' }}>
                                        <MenuItem onClick={handleClose}>
                                            <LogoutIcon />&nbsp;
                                            Logout
                                        </MenuItem>
                                    </Typography>
                                </div>
                            )}
                            {!user && (
                                <div>
                                    <Typography component='a' href='/Login' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                        <MenuItem onClick={handleClose}>
                                            <LoginIcon />&nbsp; Masuk
                                        </MenuItem>
                                    </Typography>
                                    <Typography component='a' href='/register' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                        <MenuItem onClick={handleClose}>
                                            <RegIcon />&nbsp; Daftar
                                        </MenuItem>
                                    </Typography>
                                </div>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
