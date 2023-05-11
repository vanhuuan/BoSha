import React, { useEffect, useState } from 'react'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BorderAll } from '@mui/icons-material';
import { Grid, LinearProgress, Typography } from '@mui/material';
import BookCard2 from '../../components/book/BookCard2';
import "../../css/home.css";
import CircularProgress from '@mui/material/CircularProgress';
import { userBookService } from '../../services/userBook.services';
import { bookService } from '../../services/books.services';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotificationManager } from 'react-notifications';

const LikeBook = () => {
    let navigate = useNavigate()

    const [mangaList, setMangaList] = useState({
        "total": 81,
        "pageIndex": 1,
        "pageSize": 10,
        "data": []
    })
    const [data, setData] = useState([])
    const [dataHot, setDataHot] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [isLike, setIsLike] = useState(true)
    const [colorLike, setColorLike] = useState("rgb(157, 23, 77)")
    const [colorBuy, setColorBuy] = useState("gray")

    const changeLike = (val) => {
        console.log(val)
        setIsLike(val)
        setPageNumber(0)
        setData([])
        if (val === true) {
            load()
        }
    }

    const load = async () => {
        if (isLike === true) {
            userBookService.getUserLikeBook(pageNumber, 12).then((rs) => {
                console.log(rs.data)
                setMangaList(rs.data)
                setData(rs.data.data)
            }).catch((e) => {
                NotificationManager.error("Bạn chưa đăng nhập", "Hãy đăng nhập", 1000)
                navigate("/login")
            })
        } else {
            userBookService.getUserBuyBook(pageNumber, 12).then((rs) => {
                console.log(rs.data)
                setMangaList(rs.data)
                setData(rs.data.data)
            }).catch((e) => {
                NotificationManager.error("Bạn chưa đăng nhập", "Hãy đăng nhập", 1000)
                navigate("/login")
            })
        }
    }

    useEffect(() => {
        load().catch(console.error)
        document.getElementById("like").style.color = "rgb(157, 23, 77)";
        document.getElementById("buy").style.color = "gray";
    }, [isLike])

    const fetchData = () => {
        setPageNumber(pageNumber + 1)
        console.log("Load more", pageNumber + 1)
        userBookService.getUserLikeBook(pageNumber + 1, 12).then((rs) => {
            console.log("data like", rs.data.data);
            setMangaList(rs.data)
            setData(old => old.concat(rs.data.data))
        }).catch((e) => {
            navigate("/login")
        })
    }

    const fetchBuy = () => {
        setPageNumber(pageNumber + 1)
        userBookService.getUserBuyBook(pageNumber + 1, 12).then((rs) => {
            console.log("data buy", rs.data.data);
            setMangaList(rs.data)
            setData(old => old.concat(rs.data.data))
        }).catch((e) => {
            navigate("/login")
        })
    }

    return (
        <>
            <div className='container m-0 p-0' style={{ width: `100%`, border: `0px` }}>
                <div className='row no-gutter'>
                    <div className='col-1'></div>
                    <div className='col-10' style={{ marginRight: 0 }}>
                        <div className='row no-gutter d-flex flex-row' style={{ display: "flex", justifyContent: "space-between" }}>
                            <h1 className='title' id='like' style={{ textAlign: 'left', marginTop: "2em", display: "inline-block", width: "45%" }} onClick={() => {
                                if (isLike === false) {
                                    changeLike(true)
                                    document.getElementById("like").style.color = "rgb(157, 23, 77)";
                                    document.getElementById("buy").style.color = "gray";
                                }
                            }}>Truyện đang theo dõi</h1>
                            <h1 className='title' id='buy' style={{ textAlign: 'right', marginTop: "2em", display: "inline-block", width: "45%" }} onClick={() => {
                                if (isLike === true) {
                                    changeLike(false)
                                    document.getElementById("buy").style.color = "rgb(157, 23, 77)";
                                    document.getElementById("like").style.color = "gray";
                                }
                            }}>Truyện đã mua</h1>
                        </div>
                        <div>
                            {isLike === true ?
                                <InfiniteScroll
                                    dataLength={data.length} //This is important field to render the next data
                                    next={fetchData}
                                    hasMore={data.length < mangaList.total}
                                    loader={<LinearProgress />}
                                >
                                    <Grid container spacing={2}>
                                        {
                                            data.map((item, index) => {
                                                return <Grid item xs={6} sm={4} md={2}>
                                                    <BookCard2 key={index} manga={{ index: item.lastestChapIndex, name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: item.numOfView }} />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                </InfiniteScroll>
                                : <InfiniteScroll
                                    dataLength={data.length} //This is important field to render the next data
                                    next={fetchBuy}
                                    hasMore={data.length < mangaList.total}
                                    loader={<LinearProgress />}
                                >
                                    <Grid container spacing={2}>
                                        {
                                            data.map((item, index) => {
                                                return <Grid item xs={6} sm={4} md={2}>
                                                    <BookCard2 key={index} manga={{ index: item.lastestChapIndex, name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: item.numOfView }} />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                </InfiniteScroll>}
                        </div>
                        <Typography variant='h5'>Tổng cộng {data.length} truyện</Typography>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        </>

    )
}

export default LikeBook
