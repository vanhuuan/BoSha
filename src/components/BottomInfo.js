import React from "react";
import { Grid } from "@mui/material";

const BottomInfo = (props) => {
    const book = props.book.bookDetail
    const date1 = new Date(book.updateDate);

    const moment = require('moment');
    let localeData = moment.updateLocale('vi', {
        relativeTime: {
            future: "%s",
            past: "%s giây trước",
            s: function (number, withoutSuffix, key, isFuture) {
                return '00:' + (number < 10 ? '0' : '')
                    + number + ' phút trước';
            },
            m: "01:00 minutes",
            mm: function (number, withoutSuffix, key, isFuture) {
                return (number < 10 ? '0' : '')
                    + number + ':00' + ' phút trước';
            },
            h: "một giờ trước",
            hh: "%d giờ trước",
            d: "một ngày trước",
            dd: "%d ngày trước",
            M: "một tháng trước",
            MM: "%d tháng trước",
            y: "một năm trước",
            yy: "%d năm trước"
        }
    });
    let a = moment().from(date1);
    console.log("The relative time is :", a);

    return (
        <Grid container>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Cập nhật</div>
                    <div><b>{a}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Số tập</div>
                    <div><b>{book.numOfChapter}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Đánh giá</div>
                    <div><b>{book.numOfReview}</b></div>
                </div>
            </Grid>
            <Grid item sm={3} xs={3}>
                <div className='info-item'>
                    <div>Lượt xem</div>
                    <div><b>1 ngày</b></div>
                </div>
            </Grid>
        </Grid>
    );
}

export default  BottomInfo;