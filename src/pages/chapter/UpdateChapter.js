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

const UpdateChapter = (props) => {
    const [name, setName] = React.useState('Tên chương');
    const [stt, setStt] = React.useState(0);
    const [chap, setChap] = React.useState("");
    const [demo, setDemo] = React.useState('demo');
    const [states, setStates] = React.useState(true);
    const { state } = useLocation();
    const { bookId, bookName } = state;

    let navigate = useNavigate()

    const UpdateChapter = (props) => {
        const data = {
            "bookId": bookId,
            "chapterName": name,
            "isDemo": demo === 'demo'? true : false,
            "state": states
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
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={demo}
                            onChange={(e) => {setDemo(e.target.value)}}
                        >
                            <FormControlLabel value="demo" control={<Radio />} label="Demo" />
                            <FormControlLabel value="cost" control={<Radio />} label="Cost" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>
            <EditorImage sx={{ width: "100%", marginBottom: "1em" }} parentCallback={callBackChap} >
            </EditorImage>
            <div style={{ display: "flex", alignContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={UpdateChapter}>Thêm chương</Button>
                <Button variant="contained" color="warning" onClick={(e) => { setName("Tên truyện"); setStt(0) }}>Reset</Button>
            </div>
        </div>
    )
}

export default UpdateChapter