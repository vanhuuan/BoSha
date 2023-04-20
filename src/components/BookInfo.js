import React, { useState } from "react";
import { Typography, Grid, Button, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';

const BookInfo = (props) => {
    const book = props.book.bookDetail
    return (
        <>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tác giả: </span>
                <span>{book.authorName}</span>
            </Typography>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Giá tiền: </span>
                <span>0 VND</span>
            </Typography>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tình trạng: </span>
                <span>Truyện mới</span>
            </Typography>
            <Grid container>
                <Grid item sm={3} xs={3}>
                    <div className='info-item'>
                        <div><FavoriteBorderIcon style={{ color: 'rgb(226,37,144)' }} /></div>
                        <div><b>{book.numOfStar}</b></div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={3}>
                    <div className='info-item'>
                        <div><FormatListBulletedIcon /></div>
                        <div><b>Mục lục</b></div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={3}>
                    <div className='info-item'>
                        <div><ForumIcon /></div>
                        <div><b>Đánh giá</b></div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={3}>
                    <div className='info-item'>
                        <div><ShareIcon /></div>
                        <div><b>Chia sẻ</b></div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default BookInfo;