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
import { firebaseService } from '../../services/firebase.services';

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
    const [name, setName] = useState("Tên truyện")
    const [price, setPrice] = useState(0)
    const [listCategory, setListCategory] = useState([])
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")

    let navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            rs => setBook(rs.data)
        ).catch((err) => {
            console.log(err)
            navigate("/notfound")
        })
        setIsLoading(false)
    }, [id]);

    const updateBook = () => {
        const data = {
            "bookId": id,
            "name": name,
            "categories": listCategory,
            "price": price
        }
        userBookService.addBook(data).then((rs) => {
            firebaseService.uploadPreview(rs.data.id, desc).then((rs2) => {
                firebaseService.uploadCover(rs.data.id, img).then((rs3) => {
                    console.log(rs3)
                    navigate(`/book/${rs.data.id}`)
                }).catch((err) => console.log(err))
            }).catch((err) => console.log(err))
        }).catch((err) => {
            console.log(err)
        })
    }

    const callbackPrice = (childData) => {
        setPrice(childData)
        console.log(childData)
    }

    const callbackCategory = (childData) => {
        setListCategory(childData)
        console.log(childData)
    }

    const callbackDesc = (childData) => {
        setDesc(childData)
        console.log(desc)
    }

    const callbackImg = (childData) => {
        setImg(childData)
        console.log(childData)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        {isLoading === false ? <>
                            <div className='container'>
                                <div className='container-header'>
                                    <Typography variant='h5'> Cập nhật truyện </Typography>
                                </div>
                                <div className='container-body'>
                                    <Grid container spacing={2}>
                                        <Grid item md={3} sm={12}>
                                            <FileInput book={{ img: book.cover }} parentCallback={callbackImg}></FileInput>
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
                                            <MultipleSelect parentCallback={callbackCategory}></MultipleSelect>
                                            <div sx={{ marginTop: '4px' }}>
                                                <RadioPrice book={{ price: book.price }} parentCallback={callbackPrice}></RadioPrice>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div>
                                <EditorDescription sx={{ margin: 100, border: '1px solid black' }} parentCallback={callbackDesc} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0' }}>
                                <Button variant="contained" color='success' sx={{ width: '10em' }} onClick={updateBook}>Cập nhật truyện</Button>
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