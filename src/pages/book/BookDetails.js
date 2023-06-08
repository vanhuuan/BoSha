import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Box, Typography, Button, IconButton } from '@mui/material'
import ListChapter from "../../components/ListChapter";
import BookInfo from "../../components/BookInfo";
import BottomInfo from "../../components/BottomInfo";
import BookCategories from "../../components/book/BookCategories";
import EditIcon from '@mui/icons-material/Edit';
import { userBookService } from "../../services/userBook.services";
import ReviewList from "../../components/Review";
import { Review } from "../../components/CommentReviewInput";
import { bookService } from "../../services/books.services";
import { firebaseService } from "../../services/firebase.services";
import { AddShoppingCartOutlined, Favorite, FavoriteBorder, LoginOutlined, StarBorderOutlined } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import ForumIcon from '@mui/icons-material/Forum';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShareIcon from '@mui/icons-material/Share';
import { NotificationManager } from 'react-notifications';
import { DescriptionImage } from "../../components/DescriptionImage";

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
        "category": [],
        "price": 1000,
        "state": "Unfinish"
    })
    const [status, setStatus] = useState({
        "buyed": false,
        "liked": false,
        "canEdit": false
    })
    const [preview, setPreivew] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [bookId, setBookId] = useState(id.split("-").slice(-1))
    const userName = localStorage.getItem("Name")
    const uid = localStorage.getItem("UserId");
    var isLogin = false
    if (userName) {
        isLogin = true
    }
    console.log("Login", isLogin)
    const [showMore, setShowMore] = useState(false);

    let navigate = useNavigate();

    const share = () => {
        NotificationManager.success(book.name, 'Đã sao chép', 1000);
        var host = window.location.href
        navigator.clipboard.writeText(`${host}`);
    }

    const setPreviewText = (data) => {
        setPreivew(data)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        userBookService.bookDetail(bookId).then(
            (rs) => {
                document.title = rs.data.name;
                firebaseService.gerPreview(bookId, setPreviewText)
                setBook(rs.data)
                bookService.bookStatus(bookId).then((rs) => {
                    console.log("status", rs)
                    setStatus(rs.data)
                    setIsLoading(false)
                }).catch((err) => {
                    console.error("err load status", err)
                    setIsLoading(false)
                })
            }
        ).catch((err) => {
            console.log(err)
            navigate("/NotFound")
        })
    }, [id])

    const data = { bookId: book.id, bookName: book.name }

    const buyBook = (e) => {
        if (status.buyed === false) {
            navigate("/BuyBook", { state: data })
        }
    }

    const likeBook = () => {
        userBookService.likeBook(bookId).then(() => {
            const liked = status.liked;
            setStatus(prevState => ({
                ...prevState, "liked": !liked
            }))
        })
    }

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
                                        <Typography variant='h5' onClick={window.location.reload}>{book.name} </Typography>
                                        {
                                            status.canEdit ?
                                                <IconButton onClick={() => {
                                                    var data = {
                                                        bookId: bookId
                                                    }
                                                    navigate('/book/edit', { state: data })
                                                }}>
                                                    <EditIcon style={{ color: "#4F709C" }}></EditIcon>
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
                                                    <Typography variant='h4'>{book.name} </Typography>
                                                </div>
                                                <BookCategories categories={{ cate: book.category }} />
                                                <div style={{ margin: `1em 0` }}>
                                                    <BookInfo book={{ bookDetail: book }}></BookInfo>
                                                </div>
                                                <div style={{ marginBottom: `2em` }}>
                                                    {book.authorId !== uid && isLogin === true ? <>
                                                        <Button variant="outlined" startIcon={status.liked ? <Favorite style={{ color: "#F266AB" }} /> : <FavoriteBorder style={{ color: "#F266AB" }} />} style={{ marginRight: `1em`, marginBottom: "0.5em", minWidth: "170px" }} onClick={likeBook}>
                                                            {status.liked ? 'Hủy theo dõi' : 'Theo dõi'}
                                                        </Button>
                                                        {book.price > 0 ?
                                                            <Button variant="contained" startIcon={<AddShoppingCartOutlined />} onClick={buyBook} sx={{ minWidth: "170px", marginBottom: "0.5em" }}>
                                                                {status.buyed ? 'Đã sở hữu' : 'Mua truyện'}
                                                            </Button>
                                                            :
                                                            <></>
                                                        }
                                                    </>
                                                        :
                                                        <>
                                                            {
                                                                isLogin === true ? <> </>
                                                                    : <Button variant="contained" startIcon={<LoginOutlined />} onClick={() => navigate("/login")} sx={{ minWidth: "170px", marginBottom: "0.5em" }}>
                                                                        Đăng nhập
                                                                    </Button>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                <Grid container>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <div><StarBorderOutlined style={{ color: "#faaf00" }} /></div>
                                                            <div><b>{book.numOfReview !== 0 ? book.numOfStar / (book.numOfReview) : book.numOfStar / (book.numOfReview + 1)}</b></div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <a href="#chapter-list">
                                                                <div><FormatListBulletedIcon /></div>
                                                                <div><b>Mục lục</b></div>
                                                            </a>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item'>
                                                            <a href="#review">
                                                                <div><ForumIcon /></div>
                                                                <div><b>Đánh giá</b></div>
                                                            </a>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={3} xs={3}>
                                                        <div className='info-item' onClick={share}>
                                                            <div><ShareIcon /></div>
                                                            <div><b>Chia sẻ</b></div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='container-bottom'>
                                        <BottomInfo book={{ bookDetail: book }}></BottomInfo>
                                    </div>
                                    <div className='container-bottom'>
                                        {showMore ?
                                            <div style={{ padding: "1em" }} dangerouslySetInnerHTML={{ __html: `${preview.substring(0, 250)}}` }}></div>
                                            : <div style={{ padding: "1em" }} dangerouslySetInnerHTML={{ __html: preview }}></div>
                                        }
                                        {preview.length < 250 ? <></> :
                                            <button className="btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Ít hơn" : "Mở rộng"}</button>
                                        }
                                    </div>
                                </div>

                                <div className='container'>
                                    <DescriptionImage bookId={bookId} status={status} />
                                </div>

                                <div id='chapter-list' className='container'>
                                    <div className='container-header' style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6'> Danh sách tập </Typography>
                                        {book.authorId === uid ?
                                            <Button><span style={{ color: "black" }} onClick={(e) => navigate("/chapter/addChapter", { state: data })}>Thêm chương mới</span></Button> : <></>
                                        }
                                    </div>
                                    <div className='container-body'>
                                        <ListChapter book={{ name: book.name, id: bookId, canEdit: status.canEdit, canBuyed: status.buyed }}></ListChapter>
                                    </div>
                                </div>
                                <div id='review'>
                                    {book.price === 0 || status.buyed === true ?
                                        <Review book={{ bookId: bookId }}></Review>
                                        : <></>}
                                    <ReviewList book={{ bookId: bookId }}></ReviewList>
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