import '../../../css/header.css'
import {
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
import { userBookService } from '../../../services/userBook.services';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { bookService } from '../../../services/books.services';
import { firebaseService } from '../../../services/firebase.services';

const pages = ['HOT', 'Đang theo dõi', 'Thể loại'];
const settings = ['Tài khoản', 'Tác giả', 'Đăng xuất'];

function Header() {
    let navigate = useNavigate()
    let isLogin = false;
    const userName = localStorage.getItem("Name")
    const [ava, setAva] = useState("")
    const [isHover, setIsHover] = useState(true)
    const [isLoadingCate, setIsLoadingCate] = useState(true)
    const [isLoadingAva, setIsLoadingAva] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [categories, setCategories] = React.useState([])
    const [data, setData] = useState([])

    const search = (search) => {
        setSearchTerm(search)
        console.log(search)
        const delayDebounceFn = setTimeout(() => {
            if (search.length >= 3) {
                setIsLoading(true)
                bookService.searchBook(search.trim()).then((rs) => {
                    console.log(rs.data)
                    setData(rs.data.data)
                    setIsLoading(false)
                })
            }
        }, 3000)
        return () => clearTimeout(delayDebounceFn)
    }

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

    const handleChoseNav = (event, setting) => {
        switch (setting) {
            case 'HOT': navigate('/book/search/true?hot=hot')
                break;
            case 'Đang theo dõi': navigate('/book/likeBook')
                break;
            case 'Thể loại': navigate('/book/search/true')
                break;
            default: navigate('/')
        }
        handleCloseNavMenu()
    }

    const handleAvaMenuClick = (event, setting) => {
        switch (setting) {
            case 'Đăng xuất': logout()
                setAva("")
                break;
            case 'Tài khoản': navigate('/user/userInfo')
                break;
            case 'Tác giả': navigate('/book/userBook')
                break;
            default: navigate('/')
        }
        handleCloseUserMenu()
    };

    const setAvaImg = (rs) => {
        setAva(rs)
        setIsLoadingAva(false);
    }


    useEffect(() => {
        load()
        window.addEventListener("storage", () => {
            if (localStorage.getItem("UserId")) {
                setIsLoadingAva(true);
                firebaseService.getAva(localStorage.getItem("UserId"), setAvaImg)
            } else {
                setIsLoadingAva(false)
            }
          });
        if (localStorage.getItem("UserId")) {
            setIsLoadingAva(true);
            firebaseService.getAva(localStorage.getItem("UserId"), setAvaImg)
        } else {
            setIsLoadingAva(false)
        }
    }, [])

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#4F709C" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>           
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
                                    <MenuItem key={page} id={page} onClick={(e) => handleChoseNav(e, page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        
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
                                            onClick={(e) => handleChoseNav(e, page)}
                                            onMouseEnter={(e) => { setIsHover(!isHover); }}
                                            sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, fontSize: 16 }}
                                        >
                                            {page}
                                        </Button>
                                    )
                                return (
                                    <Button
                                        key={page}
                                        onClick={(e) => handleChoseNav(e, page)}
                                        onMouseE
                                        sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, fontSize: 16 }}
                                    >
                                        {page}
                                    </Button>
                                )
                            })}
                        </Box>
                        <div className='header__toolbar-search'>
                            <div className='header__toolbar-search-input-wrap'>
                                <input
                                    className='header__toolbar-search-input'
                                    type="text"
                                    placeholder="Tìm kiếm sách"
                                    onChange={(e) => search(e.target.value)}
                                    onBlur={() => setIsLoading(true)}
                                />
                            </div>
                            <div className='header__toolbar-search-history'>
                                <ul className='header__toolbar-search-history-list'>
                                    {isLoading === false ?
                                        data.map((item, index) => {
                                            return <li className='header__toolbar-search-history-item'>
                                                <a href={`/book/${item.id}`}>
                                                    <img src={item.cover} className='header__toolbar-search-item-body'></img>
                                                    <div className='header__toolbar-search-item-body header__toolbar-search-item-info'>
                                                        <div className='header__toolbar-search-item-name'>
                                                            {item.name}
                                                        </div>
                                                        <div className='header__toolbar-search-item-chapter'>
                                                            Tập {item.lastestChapIndex}
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        })
                                        : <></>}
                                </ul>
                            </div>
                            <button className='header__toolbar-search-btn'>
                                <SearchIcon className='header__toolbar-search-btn-icon' onClick={(e) => {
                                    navigate("/book/search/true?search=" + searchTerm)
                                }
                                }></SearchIcon>
                            </button>
                        </div>
                        {isLogin ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Mở trang của bạn">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {isLoadingAva === false ?
                                            <Avatar alt={userName} src={ava} />
                                            : <></>}
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
                    {isLoadingCate === false ? <div className='header__toolbar-hover' hidden={isHover} style={{ zIndex: 100 }} onMouseLeave={() => { setIsHover(!isHover); }}>
                        {categories.map((cate) => (
                            <div className='header__toolbar-category-list-item' onClick={(e) => { navigate(`/book/search/true?categories=${cate.id}&search=`) }}>{cate.name}</div>
                        ))}
                    </div> : <></>}
                </Container>
            </AppBar>
        </>
    );
}

export default Header;
