import React, { useState, useEffect } from 'react'
import FileInput from '../../components/UploadImg';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import RadioPrice from '../../components/RadioPrice';
import MultipleSelect from '../../components/SelectMulti';
import EditorImage, { EditorDescription } from '../../components/editor/editor';
import { useParams } from 'react-router-dom';
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";

import '../../css/AddBook.css'
import { EditorState } from 'draft-js';
import { userBookService } from '../../services/userBook.services';

const EditBook = () => {
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

    let navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            rs => setBook(rs.data)
        ).catch(console.err)
        setIsLoading(false)
    }, [id]);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading == false ? <>
                            <div className='container'>
                                <div className='container-header'>
                                    <Typography variant='h5'> Cập nhật truyện </Typography>
                                </div>
                                <div className='container-body'>
                                    <Grid container spacing={2}>
                                        <Grid item md={3} sm={12}>
                                            <FileInput book={{ img: book.cover }}></FileInput>
                                        </Grid>
                                        <Grid item md={9} sm={12} width="100%">
                                            <div style={{ marginTop: 2 + 'em' }}>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Tên truyện"
                                                    className='input-text'
                                                    defaultValue={book.name}
                                                />
                                            </div>
                                            <MultipleSelect></MultipleSelect>
                                            <div sx={{ marginTop: '4px' }}>
                                                <RadioPrice book={{ price: book.price}}></RadioPrice>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div>
                                <EditorDescription sx={{ margin: 100, border: '1px solid black' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0' }}>
                                <Button variant="contained" color='success' sx={{ width: '10em' }}>Cập nhật truyện</Button>
                                <Button variant="contained" color='error' sx={{ width: '10em' }}>Reset</Button>
                            </div> </> : <></>
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

export default EditBook