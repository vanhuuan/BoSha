import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button, InputLabel, OutlinedInput, IconButton } from '@mui/material'
import ListChapter from "../../components/ListChapter";
import CommentList from "../../components/CommentList";
import BookInfo from "../../components/BookInfo";
import BottomInfo from "../../components/BottomInfo";
import BookCategories from "../../components/book/BookCategories";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import EditIcon from '@mui/icons-material/Edit';
import { userBookService } from "../../services/userBook.services";
import ReviewList from "../../components/Review";
import { Review } from "../../components/CommentReviewInput";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState({
        "id": "643656a08e27bd8b1165478b",
        "name": "Overlord",
        "authorName": "An Văn",
        "authorId": "00",
        "cover": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793",
        "preview": "",
        "numOfReview": 0,
        "numOfStar": 0,
        "numOfChapter": 0,
        "publishDate": "2023-04-12T06:58:40.676Z",
        "updateDate": "2023-04-12T06:58:40.742Z",
        "category": []
    })
    const [isLoading, setIsLoading] = useState(true)
    const uid = localStorage.getItem("UserId");

    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            (rs) => {
                console.log("Hello", rs.data)
                setBook(rs.data)
                setIsLoading(false)
            }
        ).catch((err) => console.log(err))
    }, [id])

    const data = { bookId: book.id, bookName: book.name}

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading === false ?
                            <div>
                                <div className='container'>
                                    <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='h5'>{book.name} </Typography>
                                        {book.authorId === uid ?
                                            <IconButton onClick={() => { navigate('/book/edit/' + id) }}>
                                                <EditIcon style={{ color: "#89D5C9" }}></EditIcon>
                                            </IconButton> : <></>
                                        }
                                    </div>
                                    <div className='container-body'>
                                        <Grid container spacing={2}>
                                            <Grid item md={3} sm={12}>
                                                <Box mt={2} textAlign="left">
                                                    <img src={book.cover} alt='Cover' width="100%" />
                                                </Box>
                                            </Grid>
                                            <Grid item md={9} sm={12} width="100%">
                                                <div style={{ marginTop: 2 + 'em' }}>
                                                    <Typography variant='h6'>{book.name} </Typography>
                                                </div>
                                                <BookCategories categories={{ cate: book.category }} />
                                                <BookInfo book={{ bookDetail: book }}></BookInfo>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='container-bottom'>
                                        <BottomInfo book={{ bookDetail: book }}></BottomInfo>
                                    </div>
                                    <div className='container-bottom'>
                                        <div dangerouslySetInnerHTML={{ __html: "<div>Good</div>" }}></div>
                                    </div>
                                </div>

                                <div className='container'>
                                    <div className='container-header' style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6'> Danh sách tập </Typography>
                                        {book.authorId === uid ?
                                            <Button><span style={{color: "black"}} onClick={(e) => navigate("/chapter/addChapter", { state: data })}>Thêm chương mới</span></Button> : <></>
                                        }
                                    </div>
                                    <div className='container-body'>
                                        <ListChapter book={{ id: id }}></ListChapter>
                                    </div>
                                </div>
                                <div>
                                    <Review book={{ bookId: id }}></Review>
                                    <ReviewList book={{ bookId: id }}></ReviewList>
                                </div>
                            </div> : <></>
                        }
                    </Grid>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}