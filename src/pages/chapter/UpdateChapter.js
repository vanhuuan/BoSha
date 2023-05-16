import React, { useEffect, useState, useParams } from "react";
import { EditorImage } from "../../components/editor/editor";
import { TextField, Box, Button, Grid, Typography, CircularProgress, LinearProgress } from "@mui/material";
import { useLocation } from "react-router";
import { userBookService } from "../../services/userBook.services";
import { firebaseService } from "../../services/firebase.services";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { chapterService } from "../../services/chapter.services";
import { NotificationManager } from 'react-notifications';

const data = {
    "bookId": "645368d5eb07b12be11f0271",
    "chapterId": "64536d07eb07b12be11f0272",
    "canEdit": false,
    "name": "Ngày đầu đi phỏng vấn VNG",
    "chapterNumber": 1,
    "created": "2023-05-04T08:29:59.548Z",
    "updated": "2023-05-04T08:29:59.548Z",
    "textLink": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F645368d5eb07b12be11f0271%2F64536d07eb07b12be11f0272.html?alt=media&token=042d99ef-cecb-43cd-913d-7827ab963965",
    "isDemo": true,
    "state": true
}
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const UpdateChapter = () => {
    const [name, setName] = React.useState('Tên chương');
    const [stt, setStt] = React.useState(0);
    const [chap, setChap] = React.useState("");
    const [demo, setDemo] = React.useState(true);
    const [states, setStates] = React.useState(true);
    const [chapterDetail, setChapterDetail] = useState(data)
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation();
    const data = location.state;
    const [okeChap, setOkeChap] = useState(false)
    const [error, setError] = useState(false)
    // const bookId = data.bookId;
    // const chapterId = data.chapterId

    let navigate = useNavigate()

    const UpdateChapter = (props) => {
        const data = {
            "bookId": chapterDetail.bookId,
            "chapterName": name,
            "isDemo": demo,
            "state": states,
            "chapterId": chapterDetail.chapterId,
        }

        if (name.length < 5 || name.length > 50) {
            setError(true)
            return
        }
        if (!okeChap) {
            NotificationManager.error("Dữ liệu lỗi", "Nội dung chương phải từ 100 kí tự đến 15000 ký tự!", 2000)
            return
        }

        userBookService.updateChapter(data).then((rs) => {
            console.log(rs)
            firebaseService.uploadChapter(data.bookId, chapterDetail.chapterId, chap).then((rs) => {
                console.log(rs)
                NotificationManager.success("Cập nhật thành công", name, 1000)
                navigate(`/book/${data.bookId}`)
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }

    const setChapText = (data) => {
        console.log(data)
        setChap(data)
        setIsLoading(false)
    }

    const onNameChange = (e) => {
        setName(e)
        if (e.length < 5 || e.length > 50) {
            setError(true)
        } else {
            setError(false)
        }
    }

    const callBackOke = (childData) => {
        setOkeChap(childData)
        console.log(childData)
    }

    useEffect(() => {
        setIsLoading(true)

        chapterService.chapterDetail(data.chapterId).then(
            (rs) => {
                console.log(rs.data)
                setChapterDetail(rs.data)
                setStt(rs.data.chapterNumber)
                setChap(rs.data.textLink)
                setDemo(rs.data.isDemo)
                setStates(rs.data.state)
                setName(rs.data.name)
                firebaseService.getChapter(data.bookId, data.chapterId, setChapText)
            }
        ).catch((err) => {
            console.log(err)
            // navigate(-1);
        })
    }, [])

    const callBackChap = (childData) => {
        setChap(childData)
    }

    return (
        <div>
            <Box
                component="form"
                sx={{
                    margin: "1em 0", width: "100%"
                }}
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading === false ?
                            <FormControl fullWidth>
                                <Typography variant="h5">Cập nhật chương {chapterDetail.name}</Typography>
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="Số thứ tự truyện"
                                    value={stt}
                                    type="number"
                                    sx={{ width: "100%", margin: "1em" }}
                                    disabled
                                />
                                <TextField
                                    id="outlined-controlled"
                                    label="Tên truyện"
                                    value={name}
                                    onChange={(event) => {
                                        onNameChange(event.target.value);
                                    }}
                                    sx={{ width: "100%", margin: "1em" }}
                                    helperText="Tên chương phải từ 5 đến 50 ký tự"
                                    error={error}
                                />
                                <FormLabel id="demo-controlled-radio-buttons-group">Loại chương</FormLabel>
                                <FormControlLabel
                                    control={<Android12Switch checked={demo} onChange={(e) => setDemo(e.target.checked)} />}
                                    label="Xem thử"
                                />
                                <FormControlLabel
                                    control={<Android12Switch checked={!states} onChange={(e) => setStates(!states)} />}
                                    label="Ẩn chương"
                                />
                                <EditorImage sx={{ width: "100%", marginBottom: "1em" }} parentCallback={callBackChap} okeCallback={callBackOke} chap={{ text: chap }} >
                                </EditorImage>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1em" }}>
                                    <Button variant="contained" color="warning" onClick={(e) => { navigate("/book/"+chapterDetail.bookId) }}>Trở về</Button>
                                    <Button variant="contained" color="success" onClick={UpdateChapter}>Cập nhật chương</Button>
                                </div>
                            </FormControl>
                            : <LinearProgress></LinearProgress>}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default UpdateChapter