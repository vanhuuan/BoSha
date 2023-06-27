import React from "react";
import { Typography } from "@mui/material";

const BookInfo = (props) => {
    const book = props.book.bookDetail
    console.log("book info:", book)
    return (
        <>
            <Typography style={{marginBottom: `0.5em`}}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tác giả: </span>
                <span>{book.authorName}</span>
            </Typography>
            <Typography style={{marginBottom: `0.5em`}}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Giá tiền: </span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                    .format(book.price)} </span>
            </Typography>
            <Typography style={{marginBottom: `0.5em`}}>
                <span style={{ fontWeight: '600', width: '8em', display: 'inline-block' }}>Tình trạng: </span>
                <span>{book.state === "Unfinish" ? "Chưa Hoàn thành" : book.state === "Susspend" ? "Tạm dừng" : "Đã hoàn thành"}</span>
            </Typography>
        </>
    );
}

export default BookInfo;