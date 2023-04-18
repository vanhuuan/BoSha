import React from "react";
import { Typography, Grid, Button, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';

const BookInfo = () => {
    return (
        <>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tác giả: </span>
                <span>Văn Hữu An</span>
            </Typography>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Giá tiền: </span>
                <span>0 VND</span>
            </Typography>
            <Typography>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tình trạng: </span>
                <span>Truyện mới</span>
            </Typography>
            <div sx={{ marginTop: '4px' }}>
                <InputLabel htmlFor="outlined-adornment-amount">Giá tiền</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                    label="Amount"
                    InputProps={{
                        readOnly: true
                    }}
                    defaultValue={"1000000"}
                    fullWidth
                />
            </div>
            <Grid container>
                <Grid item sm={3} xs={3}>
                    <div className='info-item'>
                        <div><FavoriteBorderIcon style={{ color: 'rgb(226,37,144)' }} /></div>
                        <div><b>1000</b></div>
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