import React, { useEffect, useState, useParams } from "react";
import { EditorImage } from "../../components/editor/editor";
import { TextField, Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
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

const data = {
    "bookId": "643656848e27bd8b116546e9",
    "chapterId": "643656888e27bd8b116546fa",
    "name": "Tập 17",
    "chapterNumber": 17,
    "created": "2023-04-12T06:58:16.574Z",
    "updated": "2023-04-12T06:58:16.574Z",
    "textLink": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656888e27bd8b116546fa.html?alt=media&token=776995dd-485f-48ed-ac04-8dcff7984a92"
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
    const bookId = data.data.bookId;
    const chapterId = data.data.chapterId

    let navigate = useNavigate()

    const UpdateChapter = (props) => {
        const data = {
            "bookId": bookId,
            "chapterName": name,
            "isDemo": demo,
            "state": states
        }
        userBookService.updateChapter(data).then((rs) => {
            console.log(rs)
            firebaseService.uploadChapter(bookId, rs.data.id, chap).then((rs) => {
                console.log(rs)
                navigate(`/book/${bookId}`)
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }

    const setChapText = (data) => {
        setChap(data)
    }

    useEffect(() => {
        setIsLoading(true)

        chapterService.chapterDetail(chapterId).then(
            (rs) => {
                console.log(rs.data)
                setChapterDetail(rs.data)
                setChap(rs.data.textLink)
                firebaseService.getChapter(chapterDetail.bookId, chapterDetail.chapterId, setChapText)
                setDemo(chapterDetail.isDemo)
                setStates(chapterDetail.states)
                setName(chapterDetail.name)
                setIsLoading(false)
            }
        ).catch(() => {
            navigate(-1);
        })
    }, [])

    const callBackChap = (childData) => {
        setChap(childData)
        console.log(childData)
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
                        <Button></Button>
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading === false ?
                            <FormControl>
                                <Typography variant="h5">Cập nhật chương {chapterDetail.name}</Typography>
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="Số thứ tự truyện"
                                    value={stt}
                                    onChange={(event) => {
                                        setStt(event.target.value);
                                    }}
                                    type="number"
                                    sx={{ width: "100%", margin: "1em" }}
                                />
                                <TextField
                                    id="outlined-controlled"
                                    label="Tên truyện"
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    sx={{ width: "100%", margin: "1em" }}
                                />
                                <FormLabel id="demo-controlled-radio-buttons-group">Loại chương</FormLabel>
                                <FormControlLabel
                                    control={<Android12Switch checked={demo} onChange={(e) => setDemo(e.target.checked)} />}
                                    label="Xem thử"
                                />
                            </FormControl>
                            : <CircularProgress></CircularProgress>}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>
            <EditorImage sx={{ width: "100%", marginBottom: "1em" }} parentCallback={callBackChap} props={{ text: data }} >
            </EditorImage>
            <div style={{ display: "flex", alignContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={UpdateChapter}>Cập nhật chương</Button>
                <Button variant="contained" color="warning" onClick={(e) => { setName("Tên truyện"); setStt(0) }}>Reset</Button>
            </div>
        </div>
    )
}

export default UpdateChapter