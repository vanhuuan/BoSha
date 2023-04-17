import React from "react";
import ReactDOM from "react-dom";
import { Pagination, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Divider, Avatar, Grid, Paper } from "@mui/material";

import "../css/CommentList.css";

const imgLink =
    "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/341263434_237177232146883_4137101451342149163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oVBrUKg6yQAAX8WzY_X&_nc_ht=scontent.fdad1-2.fna&oh=00_AfBi2or8ZeYBWoubGayzCsvCNN5xr_CldVenzY8DGaB3jw&oe=6440F313";

const comments = [
    {
        "Name": "Toan",
        "Text": "Anh an 17cm"
    }, 
    {
        "Name": "Toan",
        "Text": "Anh an 17cm"
    }, 
    {
        "Name": "Toan",
        "Text": "Anh an 17cm"
    }
]
function CommentList() {


    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Comments</h1>
            {comments.map((item, index) => (
                <Paper style={{ padding: "40px 20px" }}>
                    <Grid container wrap="nowrap" spacing={2}>

                        <Grid item>
                            <Avatar alt="Remy Sharp" src={imgLink} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{item.Name}</h4>
                            <p style={{ textAlign: "left" }}>
                                {item.Text}
                            </p>
                            <div className="comment-bottom">
                                <span className="comment-icon">
                                    <FavoriteIcon className="icon" />
                                    <span>1000</span>
                                </span>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    10 tháng trước
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Pagination count={10} page={5} sx={{ marginTop: '2em' }} />
            {/* // onChange={handleChange} /> */}
        </div>
    );
}

export default CommentList
