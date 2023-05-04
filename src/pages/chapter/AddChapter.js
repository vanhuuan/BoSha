import React from "react";
import { EditorImage } from "../../components/editor/editor";
import { TextField, Box, Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { userBookService } from "../../services/userBook.services";
import { firebaseService } from "../../services/firebase.services";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

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


const AddChapter = (props) => {
    const [name, setName] = React.useState('Tên chương');
    const [stt, setStt] = React.useState(0);
    const [chap, setChap] = React.useState("");
    const [demo, setDemo] = React.useState(true);
    const location = useLocation();
    const data = location.state;
    const bookId = data.data.bookId;
    const bookName = data.data.bookName

    console.log(data.data)

    let navigate = useNavigate()

    const AddChapter = () => {
        const data = {
            "bookId": bookId,
            "chapterName": name,
            "chapterNumber": stt,
            "isDemo": demo
        }
        userBookService.addChapter(data).then((rs) => {
            console.log(rs)
            firebaseService.uploadChapter(bookId, rs.data.id, chap).then((rs) => {
                console.log(rs)
                navigate(`/book/${bookId}`)
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }

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
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <FormControl>
                            <Typography variant="h5">Thêm chương mới cho truyện {bookName}</Typography>
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
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>
            <EditorImage sx={{ width: "100%", marginBottom: "1em" }} parentCallback={callBackChap} >
            </EditorImage>
            <div style={{ display: "flex", alignContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={AddChapter}>Thêm chương</Button>
                <Button variant="contained" color="warning" onClick={(e) => { setName("Tên truyện"); setStt(0) }}>Reset</Button>
            </div>
        </div>
    )
}

export default AddChapter