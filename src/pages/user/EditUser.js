import React from "react";
import { CheckCircle, EditLocation, EmailOutlined, Person2, PhoneAndroidOutlined, SupervisedUserCircle } from "@mui/icons-material";
import { Box, CircularProgress, Divider, Grid, IconButton, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, styled } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import Avatar from 'react-avatar-edit'
import { userService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';

export default function EditUser() {
    const [userInfo, setUserInfo] = useState({
        "id": "64524e67c851f42527dd44e0",
        "name": "fake",
        "email": "fake@gmail.com",
        "photo": "",
        "phone": "fake phone number",
        "roles": [
            "User"
        ],
        "accessToken": null,
        "refreshToken": null
    })

    let navigate = useNavigate()
    const [avaState, setAvaState] = useState({
        preview: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05",
        src: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05"
    })
    const [isLoading, setIsLoading] = useState(true)

    function onClose() {
        setAvaState({ preview: null })
    }

    function onCrop(preview) {
        setAvaState({ preview })
    }

    useEffect(() => {
        setIsLoading(true)
        userService.getUserInfo().then((rs) => {
            console.log(rs.data)
            setUserInfo(rs.data)
            setIsLoading(false)
        })
    }, [])

    const update = () => {
        const data = {
            "name": userInfo.name,
            "phoneNumber": userInfo.phone
        }

        userService.updateUserInfo(data).then((e) => {
            NotificationManager.suscess("Cập nhật", 'thành công', 1000);
            navigate("/user/userInfo")
        }).catch((e) => {
            NotificationManager.error("Cập nhật", 'thất bại', 1000);
            navigate("/user/userInfo")
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`}>
            <Grid container spacing={2}>
                <Grid xs="1">

                </Grid>
                <Grid xs="10">
                    {isLoading === false ?
                        <div className="container">
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h5'>Thông tin tài khoản </Typography>
                                <Typography variant='h5' onClick={(e) => { navigate("/user/statistic") }}>Thống kê truyện </Typography>
                            </div>
                            <div className='container-body'>
                                <Grid container spacing={2}>
                                    <Grid md="4">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="h5"> Tên người dùng </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid md="6">
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><Person2 /></InputAdornment>}
                                                required
                                                value={userInfo.name}
                                                defaultValue={userInfo.name}
                                                onChange={(e) => { setUserInfo({ "name": e.target.value }) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Divider></Divider>
                                    <Grid md="4"><Typography variant="h5">Email</Typography></Grid>
                                    <Grid md="6">
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><EmailOutlined /></InputAdornment>}
                                                required
                                                disabled
                                                value={userInfo.email}
                                                defaultValue={userInfo.email}
                                                onChange={(e) => { setUserInfo({ "email": e.target.value }) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Divider></Divider>
                                    <Grid md="4"><Typography variant="h5">Số điện thoại</Typography></Grid>
                                    <Grid md="6">
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment position="start"><PhoneAndroidOutlined /></InputAdornment>}
                                                required
                                                value={userInfo.phone}
                                                defaultValue={userInfo.phone}
                                                onChange={(e) => { setUserInfo({ "phone": e.target.value }) }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <IconButton>
                                    <CheckCircle onClick={(e) => { update() }} color="info" />
                                </IconButton>
                            </div>
                        </div>

                        : <CircularProgress />}
                </Grid>
                <Grid xs="1">

                </Grid>
            </Grid>
        </Box >
    )
}