import React from "react";
import { Grid } from "@mui/material";

const BottomInfo = () => {
    return (
        <Grid container>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>1 ngày</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>1 ngày</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>1 ngày</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>1 ngày</b></div>
                </div>
            </Grid>
        </Grid>
    );
}

export default  BottomInfo;