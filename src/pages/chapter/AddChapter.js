import React from "react";
import { EditorImage } from "../../components/editor/editor";
import { TextField, Box, Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router";

const AddChapter = (props) => {
    const [name, setName] = React.useState('Tên chương');
    const [stt, setStt] = React.useState(0);
    const [chap, setChap] = React.useState("");
    const { state } = useLocation();
    const { bookId, bookName } = state;
    console.log(bookName)

    const AddChapter = () => {
        const data = {
            "bookId": bookId
        }
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
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Box>
            <EditorImage sx={{ width: "100%", marginBottom: "1em" }} parentCallback={callBackChap} >
            </EditorImage>
            <div style={{ display: "flex", alignContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={AddChapter}>Thêm chương</Button>
                <Button variant="contained" color="warning" onClick={(e) => { setName("Tên truyện"); setStt(0)}}>Reset</Button>
            </div>
        </div>
    )
}

export default AddChapter