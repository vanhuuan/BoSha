import React from "react";
import { Camera, CameraAlt, CheckCircle, EditLocation, EmailOutlined, Person2, PhoneAndroidOutlined, PhotoCamera, SupervisedUserCircle } from "@mui/icons-material";
import { Box, CircularProgress, Divider, Grid, IconButton, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, styled, Badge, Avatar } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { userService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { firebaseService } from "../../services/firebase.services";

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
    const [ava, setAva] = useState(avaState.src)
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(null);

    const [nameHelp, setNameHelp] = useState("")

    const validPhone = (phone) => {
        if (isVietnamesePhoneNumberValid(phone)) {
            console.log(phone)
            setUserInfo(prevState => ({
                ...prevState, "phone": phone
            })
            )
            setPhoneHelp("")
        } else {
            setPhoneHelp("Không đúng định dạng số điện thoại")
        }
    }

    function isVietnamesePhoneNumberValid(number) {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    }

    const validName = (name) => {
        if (name.length < 5 || name.length > 30) {
            setNameHelp("Tên phải có chiều dài từ 5 đến 30 ký tự")
        } else {
            setUserInfo(prevState => ({
                ...prevState, "name": name
            })
            )
            setNameHelp("")
        }
    }

    const [phoneHelp, setPhoneHelp] = useState("")

    useEffect(() => {
        setIsLoading(true)
        userService.getUserInfo().then((rs) => {
            console.log(rs.data)
            setUserInfo(rs.data)
            firebaseService.getAva(rs.data.id, getAva)
            setIsLoading(false)
        })
    }, [])

    const update = async () => {
        if (nameHelp.length > 0) {
            NotificationManager.error("Tên", 'không đúng định dạng', 1000);
        }
        if (phoneHelp.length > 0) {
            NotificationManager.error("Số điện thoại", 'không đúng định dạng', 1000);
        }
        const data = {
            "name": userInfo.name,
            "phoneNumber": userInfo.phone
        }

        console.log(userInfo)

        userService.updateUserInfo(data).then((rs) => {
            firebaseService.uploadAva(userInfo.id, imageUrl).then((rs) => {
                NotificationManager.success("Cập nhật", 'thành công', 1000);
                navigate("/user/userInfo")
            }).catch((e) => {
                console.log(e)
                NotificationManager.error("Cập nhật", 'Thất bại', 1000);
                navigate("/user/userInfo")
            })
        }).catch((e) => {
            console.log(e)
            NotificationManager.error("Cập nhật", 'Thất bại', 1000);
            navigate("/user/userInfo")
        })
    }

    const getAva = (avaUrl) => {
        setAva(avaUrl)
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
                            <div className='container-body' style={{ display: "flex", alignItems: "center" }}>
                                {ava ?
                                    <Badge
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <IconButton color="primary" aria-label="upload picture" component="label">
                                                <input hidden accept="image/*" type="file" onChange={(e) => {
                                                    if (e.target.files[0]) {
                                                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                                                        setAva(URL.createObjectURL(e.target.files[0]))
                                                    }
                                                }} />
                                                <PhotoCamera />
                                            </IconButton>
                                        }>
                                        <Avatar sx={{ width: "5em", height: "5em" }} alt={userInfo.name} src={ava} />
                                    </Badge>
                                    :
                                    <Badge
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <IconButton color="primary" aria-label="upload picture" component="label">
                                                <input hidden accept="image/*" type="file" onChange={(e) => {
                                                    if (e.target.files[0]) {
                                                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                                                        setAva(URL.createObjectURL(e.target.files[0]))
                                                    }
                                                }} />
                                                <PhotoCamera />
                                            </IconButton>
                                        }>
                                        <Avatar sx={{ width: "5em", height: "5em" }} alt={userInfo.name}>
                                            {userInfo.name[0] ? userInfo.name[0] : "P"}
                                        </Avatar>
                                    </Badge>
                                }
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
                                                // value={userInfo.name}
                                                defaultValue={userInfo.name}
                                                onChange={(e) => { validName(e.target.value) }}
                                                helperText={nameHelp}
                                                error={nameHelp.length > 0}
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
                                                // value={userInfo.phone}
                                                defaultValue={userInfo.phone}
                                                onChange={(e) => { validPhone(e.target.value) }}
                                                error={phoneHelp.length > 0}
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