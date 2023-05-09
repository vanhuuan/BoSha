import { EditLocation } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { userService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { firebaseService } from "../../services/firebase.services";

export default function UserInfo() {
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
    const [avaState, setAvaState] = useState({
        preview: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05",
        src: "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2FIMG_0017.jpg?alt=media&token=feb2403d-d713-4ea9-bef8-2a1981af0d05"
    })
    const [ava, setAva] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    function onClose() {
        setAvaState({ preview: null })
    }

    function onCrop(preview) {
        setAvaState({ preview })
    }

    let navigate = useNavigate()

    const getAva = (avaUrl) => {
        setAva(avaUrl)
    }

    useEffect(() => {
        setIsLoading(true)
        userService.getUserInfo().then((rs) => {
            console.log(rs.data)
            setUserInfo(rs.data)
            firebaseService.getAva(rs.data.id, getAva)
            setIsLoading(false)
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`}>
            <Grid container spacing={2}>
                <Grid xs="1">

                </Grid>
                <Grid xs="10">
                    {isLoading === false ?
                        <div className="container" padding={"1em"}>
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h5'>Thông tin tài khoản </Typography>
                                <Typography variant='h5' onClick={(e) => { navigate("/user/statistic") }} >Thống kê truyện </Typography>
                            </div>
                            <div className='container-body' style={{ display: "flex", alignItems: "center" }}>
                                {ava ?
                                    <Avatar sx={{ width: "5em", height: "5em" }} alt={userInfo.name} src={ava} />
                                    :
                                    <Avatar sx={{ width: "5em", height: "5em" }} alt={userInfo.name}>{userInfo.name[0]}</Avatar>
                                }
                            </div>
                            <div className='container-body'>
                                <Grid container spacing={2}>
                                    <Grid md="4"><Typography variant="h5">Tên người dùng</Typography></Grid>
                                    <Grid md="6"><Typography variant="h5">{userInfo.name}</Typography></Grid>
                                    <Divider></Divider>
                                    <Grid md="4"><Typography variant="h5">Email</Typography></Grid>
                                    <Grid md="6"><Typography variant="h5">{userInfo.email}</Typography></Grid>
                                    <Divider></Divider>
                                    <Grid md="4"><Typography variant="h5">Số điện thoại</Typography></Grid>
                                    <Grid md="6"><Typography variant="h5">{userInfo.phone}</Typography></Grid>
                                </Grid>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <IconButton onClick={() => navigate("/user/userEdit")} color="info">
                                    <EditIcon />
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