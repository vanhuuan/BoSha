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
import { userBookService } from '../../../services/userBook.services';
import { useEffect } from 'react';
import zIndex from '@mui/material/styles/zIndex';


const pages = ['HOT', 'Đang theo dõi', 'Thể loại', 'Tìm truyện'];
const settings = ['Tài khoản', 'Tác giả', 'Đăng xuất'];

function Header() {
    let navigate = useNavigate()
    let isLogin = false;
    const userName = localStorage.getItem("Name")
    const ava = localStorage.getItem('Ava')
    const [isHover, setIsHover] = useState(true)
    const [isLoadingCate, setIsLoadingCate] = useState(true)

    const [categories, setCategories] = React.useState([])
    const load = async () => {
        setIsLoadingCate(true)
        const rs = await userBookService.categories();
        console.log(rs)
        if (rs) {
            setCategories(rs.data)
            setIsLoadingCate(false)
        }
    }


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

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#89D5C9" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => { navigate("/") }} />
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
                            BOSHA
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
                            href="/"
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
                            BOSHA
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => {
                                if (page === "Thể loại")
                                    return (
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            onMouseEnter={(e) => { setIsHover(!isHover); }}
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
                                )
                            })}
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
                    {isLoadingCate === false ? <div className='header__toolbar-hover' hidden={isHover} style={{zIndex: 1}} onMouseLeave={() => { setIsHover(!isHover); }}>
                        {categories.map((cate) => (
                            <div className='header__toolbar-category-list-item' onClick={(e) => { navigate("/book/search") }}>{cate.name}</div>
                        ))}
                    </div> : <></>}
                </Container>
            </AppBar>
        </>
    );
}

export default Header;
