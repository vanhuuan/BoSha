import LogoTurquoise from '../../../assets/images/LogoTurquoise.png'
import React, { useState } from 'react';
import '../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import { AppBar, Button, Typography } from '@mui/material';


function Header() {
    let activeStyle = {
        color: "#FF8357",
        paddingBottom: '15px',
        borderBottom: 'solid 5px #FF8357'
    };
    let navigate = useNavigate()
    // const [isLogin, setIsLogin] = useState(false)
    let isLogin = false
    const userName = localStorage.getItem("Name")
    // const token = localStorage.getItem("AccessToken")

    if (userName) {
        isLogin = true
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <AppBar position="fixed"
            sx={{ flexDirection: 'inherit', background: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <div className='container'>
                <img src={LogoTurquoise} style={{ width: 60 }} alt="Logo" />
                <Link exact="true" to="/"><span className='brand'>Foorder</span></Link>
            </div>
            {isLogin ?
                <div className='container'>
                    <Typography color='black'>{userName}</Typography>
                    <Button style={{ marginLeft: 10 }} onClick={logout}>Đăng xuất</Button>
                </div>
                : <Link to="/login">Đăng nhập</Link>}

        </AppBar>
    );
}

export default Header;
