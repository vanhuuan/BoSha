import { Box, Typography, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CommentList from "../../components/CommentList";
import LinearProgress from '@mui/material/LinearProgress';
import ChapterNav from "../../components/ChapterNav";
import { chapterService } from "../../services/chapter.services";
import { useParams } from "react-router-dom";
import { firebaseService } from "../../services/firebase.services";
import { Comment } from "../../components/CommentReviewInput";
import { useNavigate } from "react-router-dom";
import { bookService } from "../../services/books.services";
import { LockPerson } from "@mui/icons-material";

const data = {
    "bookId": "643657ac8e27bd8b11654e30",
    "chapterId": "643657ad8e27bd8b11654e35",
    "canEdit": true,
    "name": "Tập 5",
    "chapterNumber": 5,
    "created": "2023-04-12T07:03:09.654Z",
    "updated": "2023-04-12T07:03:09.654Z",
    "textLink": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643657ac8e27bd8b11654e30%2F643657ad8e27bd8b11654e35.html?alt=media&token=2c6d0b9d-a614-4fad-9b37-9039dd97edf4",
    "isDemo": false,
    "state": true
}

const Chapter = () => {
    const { id } = useParams();
    const [chap, setChap] = useState("5")
    const [isLoading, setIsLoading] = useState(true)
    const [chapterDetail, setChapterDetail] = useState(data)
    const [dateUpdate, setDateUpdate] = useState("")
    const [status, setStatus] = useState({
        "buyed": false,
        "liked": false,
        "canEdit": false
    })
    const resultRef = useRef(null);
    const [chapterId, setChapterId] = useState(id)

    let navigate = useNavigate()
    const moment = require('moment');
    moment.updateLocale('vi', {
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
                    + number + ' phút trước';
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

    const setChapText = (data) => {
        setChap(data)
    }

    const changeChapter = (chap) => {
        setChapterId(chap)
    }

    useEffect(() => {
        console.log(chapterId)
        setIsLoading(true)
        chapterService.chapterDetail(chapterId).then(
            (rs) => {
                console.log(rs.data)
                setChapterDetail(rs.data)
                setChap(rs.data.textLink)
                firebaseService.getChapter(rs.data.bookId, rs.data.chapterId, setChapText)
                const date1 = new Date(chapterDetail.updated);
                let a = moment().from(date1);
                setDateUpdate(a)
                bookService.bookStatus(rs.data.bookId).then((rs) => {
                    console.log(rs)
                    setStatus(rs)
                }).catch(console.error)
                setIsLoading(false)
            }
        ).catch((err) => {
            console.log(err)
            navigate("/NotFound");
        })
    }, [chapterId])

    const buyBook = (e) => {
        if (status.buyed === false) {
            navigate("/BuyBook", { state: data })
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    {isLoading === false ? <>
                        <div style={{ textAlign: "center" }}>
                            <Typography>{`${chapterDetail.name}`}</Typography>
                            <Typography>{`${chapterDetail.chapterNumber}: ${chapterDetail.name}`}</Typography>
                            <Typography>{`${chap.replace(/(<([^>]+)>)/ig, '').trim().split(/\s+/).length}, cập nhật ${dateUpdate}`}</Typography>
                            <ChapterNav chapter={{ book: chapterDetail.bookId, chap: id }} parentCallback={changeChapter} resultRef={resultRef}></ChapterNav>
                            {status.buyed === true || status.canEdit === true || chapterDetail.isDemo === true ?
                                <div dangerouslySetInnerHTML={{ __html: chap }} style={{ textAlign: "left" }}></div>
                                : <IconButton color="primary" onClick={buyBook}>
                                    <LockPerson /> Hãy mua truyện này.
                                </IconButton>
                            }
                        </div>

                        <Comment chap={{ chapId: chapterId }}></Comment>
                        <CommentList chap={{ chapId: chapterId }} ref={resultRef}></CommentList> </> :
                        <>
                            <LinearProgress />
                        </>
                    }
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </Box>
    )
}

export default Chapter

