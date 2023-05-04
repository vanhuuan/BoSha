import LogoTurquoise from '../../../assets/images/LogoTurquoise.png'
import '../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import * as React from 'react';
import { useState } from 'react';
import { AppBar, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from "@mui/material";



const pages = ['HOT', 'Đang theo dõi', 'Thể loại', 'Tìm truyện'];
const settings = ['Tài khoản', 'Tác giả', 'Đăng xuất'];

function Header() {
    let navigate = useNavigate()
    let isLogin = false;
    const userName = localStorage.getItem("Name")
    const ava = localStorage.getItem('Ava')
    const [ isHover, setIsHover ] = useState(true)

    if (userName) {
        isLogin = true
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const SignIn = (event) => {
        navigate("/logIn")
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAvaMenuClick = (event, setting) => {
        switch (setting) {
            case 'Đăng xuất': logout()
                break;
            case 'Tài khoản': navigate('/')
                break;
            case 'Tác giả': navigate('/book/userBook')
                break;
            default: navigate('/')
        }
        handleCloseUserMenu()
    };

    return (
        <>
        <AppBar position="static" >
            <Container maxWidth="xl" sx={{backgroundColor: "#89D5C9"}}>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) =>{ 
                            if(page === "Thể loại")
                                return (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        onMouseEnter={(e) => {setIsHover(!isHover);}}
                                        sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, fontSize: 16 }}
                                    >
                                        {page}
                                    </Button>
                                )
                            return (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                onMouseE
                                sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, fontSize: 16 }}
                            >
                                {page}
                            </Button>
                        ) } ) }
                    </Box>
                    {isLogin ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={userName} src={ava} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={(event) => handleAvaMenuClick(event, setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        :
                        <Box sx={{ flexGrow: 0 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'monospace', fontSize: 20 }}
                                onClick={(event) => SignIn(event)}>
                                Đăng nhập
                            </Button>
                        </Box>
                    }
                </Toolbar>
                <div className='header__toolbar-hover' hidden={isHover}>
                    <div className='header__toolbar-category-list-item'>Tất cả</div>
                    <div className='header__toolbar-category-list-item'>Action</div>
                    <div className='header__toolbar-category-list-item'>Adult</div>
                    <div className='header__toolbar-category-list-item'>Adventure</div>
                    <div className='header__toolbar-category-list-item'>Anime</div>
                    <div className='header__toolbar-category-list-item'>Chuyển Sinh</div>
                </div>
            </Container>
        </AppBar>
        </>
    );
}

export default Header;
