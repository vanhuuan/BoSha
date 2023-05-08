import React, { useState, useEffect } from 'react'
import FileInput from '../../components/UploadImg';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import RadioPrice from '../../components/RadioPrice';
import MultipleSelect from '../../components/SelectMulti';
import EditorImage, { EditorDescription } from '../../components/editor/editor';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import AlertRoot from '../../components/notification/AlertRoot';
import { NotificationManager } from 'react-notifications';

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
        "category": [],
        "price": 1000,
        "state": "Unfinish"
    })
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState("Tên truyện")
    const [price, setPrice] = useState(0)
    const [listCategory, setListCategory] = useState([])
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [imgChange, setImgChange] = useState(false)
    const [state, setState] = useState("Unfinish")
    const [messageText, setMessageText] = useState("")
    const [titleText, setTitleText] = useState("Sai dữ liêu đầu vào")
    const [open, setOpen] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(id).then(
            rs => {
                console.log(rs.data)
                setBook(rs.data)
                setPrice(rs.data.price)
                setListCategory(rs.data.category)
                setState(rs.data.state)
                firebaseService.gerPreview(id, (rs2) => { setDesc(rs2); setIsLoading(false) })
            }
        ).catch((err) => {
            console.log(err)
            navigate("/notfound")
        })
    }, [id]);

    const updateBook = () => {
        if (price < 0 || (price > 0 && price < 1000) || (price > 1000000)) {
            NotificationManager.error(book.name, 'Giá truyện phải là miễn phí hoặc từ 1.000 VND đến 1.000.000 VND', 1000);
            setOpen(true)
            return;
        }
        if (name.length < 5 || name.length > 100) {
            NotificationManager.error(book.name, 'Tên truyện phải chứa từ 5 đến 100 ký tự', 1000);
            setOpen(true)
            return;
        }
        if (desc.length < 50 || desc.length > 3000) {
            NotificationManager.error(book.name, 'Miêu tả phải chứa từ 50 đến 3000 ký tự', 1000);
            setOpen(true)
            return;
        }
        const data = {
            "bookId": id,
            "name": name,
            "categories": listCategory,
            "price": price,
            "state": state
        }
        userBookService.updateBook(data).then((rs) => {
            firebaseService.uploadPreview(rs.data.id, desc).then((rs2) => {
                if (imgChange) {
                    firebaseService.uploadCover(rs.data.id, img).then((rs3) => {
                        console.log(rs3)
                        navigate(`/book/${rs.data.id}`)
                    }).catch((err) => console.log(err))
                } else {
                    navigate(`/book/${rs.data.id}`)
                }
            }).catch((err) => console.log(err))
        }).catch((err) => {
            console.log(err)
        })
    }

    const callbackPrice = (childData) => {
        setPrice(childData)
        setMessageText("")
    }

    const callbackCategory = (childData) => {
        setListCategory(childData)
        setMessageText("")
    }

    const callbackDesc = (childData) => {
        setDesc(childData)
        setMessageText("")
    }

    const callbackImg = (childData) => {
        setImg(childData)
        setImgChange(true)
        setMessageText("")
    }

    return (
        <div>
            {messageText.length > 0 ? <AlertRoot message={messageText} title={titleText} openDialog={open}></AlertRoot> : <></>}
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
                                                    onChange={(e) => { setName(e.target.value); setMessageText("") }}
                                                />
                                            </div>
                                            <MultipleSelect book={{ categories: book.category }} parentCallback={callbackCategory}></MultipleSelect>
                                            <div sx={{ marginTop: '4px' }}>
                                                <RadioPrice book={{ price: book.price }} parentCallback={callbackPrice}></RadioPrice>
                                            </div>
                                            <div>
                                                {state === "Suspend" ? <></> : <>
                                                    <InputLabel id="demo-select-small-label">Tình trạng</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        value={state}
                                                        label="Tình trạng"
                                                        onChange={(e) => setState(e.target.value)}
                                                    >
                                                        <MenuItem value={"Unfinish"}>Chưa hoàn thành</MenuItem>
                                                        <MenuItem value={"Finish"}>Đã hoàn thành</MenuItem>
                                                        <MenuItem value={"Suspend"}>Bị ẩn</MenuItem>
                                                    </Select>
                                                </>
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div>
                                <EditorDescription sx={{ margin: 100, border: '1px solid black' }} book={{ text: desc }} parentCallback={callbackDesc} />
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