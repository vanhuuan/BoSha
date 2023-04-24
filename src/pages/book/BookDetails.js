import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import ListChapter from "../../components/ListChapter";
import CommentList from "../../components/CommentList";
import BookInfo from "../../components/BookInfo";
import BottomInfo from "../../components/BottomInfo";
import BookCategories from "../../components/book/BookCategories";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import EditIcon from '@mui/icons-material/Edit';
import { userBookService } from "../../services/userBook.services";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState({
        "id": "643656a08e27bd8b1165478b",
        "name": "Overlord",
        "authorName": "An Văn",
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
    console.log(isLoading)

    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            rs => setBook(rs.data)
        ).catch(console.err)
        setIsLoading(false)
    }, [])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading == false ?
                            <div>
                                <div className='container'>
                                    <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant='h5'>{book.name} </Typography>
                                        <IconButton onClick={() => { navigate('/book/edit/' + id) }}>
                                            <EditIcon style={{ color: "#89D5C9" }}></EditIcon>
                                        </IconButton>
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
                                                    <TextField
                                                        id="outlined-required"
                                                        label="Tên truyện"
                                                        defaultValue={book.name}
                                                        className='input-text'
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        sx={{ marginBottom: '1em' }}
                                                    />
                                                </div>
                                                <BookCategories categories={{ cate: book.category}} />
                                                <BookInfo book={{ bookDetail: book }}></BookInfo>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='container-bottom'>
                                        <BottomInfo book={{ bookDetail: book }}></BottomInfo>
                                    </div>
                                    <div className='container-bottom'>
                                        <iframe width={"100%"} src="https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656868e27bd8b116546eb.html?alt=media&token=c30b3b69-47f7-487e-8410-1f3b0ec56b14"></iframe>
                                    </div>
                                </div>

                                <div className='container'>
                                    <div className='container-header'>
                                        <Typography variant='h6'> Danh sách tập </Typography>
                                    </div>
                                    <div className='container-body'>
                                        <ListChapter book={{ id: id }}></ListChapter>
                                    </div>
                                </div>
                                <div>
                                    <CommentList book={{ id: id }}></CommentList>
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