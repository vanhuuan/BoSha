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
    const [ book, setBook ] = useState({})

    let navigate = useNavigate();

    const load = async () => {
        const rs = await userBookService.bookDetail(id)
        console.log(rs)
        if(rs){
            setBook(rs.data)
        }
    }

    useEffect(() => {
        console.log(id);
        load()
    }, [id])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        <div className='container'>
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant='h5'>{book.name} </Typography>
                                <IconButton onClick={() => { navigate('/book/edit/'+id) }}>
                                    <EditIcon style={{ color: "#89D5C9"}}></EditIcon>
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
                                        <BookCategories categories={book.categories}></BookCategories>
                                        <BookInfo></BookInfo>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='container-bottom'>
                                <BottomInfo></BottomInfo>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='container-header'>
                                <Typography variant='h6'> Danh sách tập </Typography>
                            </div>
                            <div className='container-body'>
                                <ListChapter book={{ id: book.id}}></ListChapter>
                            </div>
                        </div>
                        <div>
                            <CommentList></CommentList>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}