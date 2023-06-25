import React, { useState, useEffect } from 'react'
import BookCard2 from '../../components/book/BookCard2'
import { userBookService } from '../../services/userBook.services';
import '../../css/userbook.css'
import { Button, Grid, LinearProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserBook = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [mangaList, setMangaList] = useState({
        "total": 81,
        "pageIndex": 1,
        "pageSize": 10,
        "data": []
    })
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        const load = async () => {
            const rs = await userBookService.userBook(pageNumber, 12, "Name", "fghdf", "CreateDate", "Desc");
            console.log(rs.data)
            if (rs) {
                setMangaList(rs.data)
                setData(rs.data.data)
            }
        }

        setIsLoading(true)
        load().catch(console.error)
        setIsLoading(false)
    }, [])

    const fetchData = () => {
        setPageNumber(pageNumber + 1)
        console.log("Load more", pageNumber + 1)
        userBookService.userBook(pageNumber, 12, "Name", "fghdf", "CreateDate", "Desc").then((rs) => {
            console.log("data new", rs.data.data);
            setData(old => old.concat(rs.data.data))
        }).catch(console.error)
    }

    return (
        <div className='homePage container-fluid'>
            <div className='row' style={{ margin: "2em 0" }}>
                <div className='col-lg-1'></div>
                <div className='col-lg-2' style={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}>
                    <span>
                        <Button id="addBook" href="/book/addBook" variant="contained" sx={{ display: 'inline' }}>Thêm truyện mới</Button>
                    </span>
                </div>
                <div className='col-lg-1'></div>
            </div>

            <div className='row d-flex flex-row'>
                <div className='col-1'></div>
                {isLoading === false ? <>
                    <div className='col-10 position-relative'>
                        <Grid container spacing={2}>

                            <InfiniteScroll
                                dataLength={data.length} //This is important field to render the next data
                                next={fetchData}
                                hasMore={data.length !== mangaList.total}
                                loader={<LinearProgress />}
                            >
                                <Grid container spacing={2}>
                                    {
                                        data.map((item, index) => {
                                            var stars = 0;
                                            if (item.numOfReview !== 0) {
                                                stars = item.numOfStar / item.numOfReview
                                            }
                                            return <Grid item xs={6} sm={4} md={2}>
                                                <BookCard2 key={index} manga={{ index: item.lastestChapIndex, name: item.name, id: item.id, image: item.cover, star: stars, view: item.numOfView }} />
                                            </Grid>
                                        })
                                    }
                                </Grid>
                            </InfiniteScroll>

                        </Grid>
                    </div>
                    <div className='row d-flex justify-content-center flex-wrap' style={{ marginTop: '4em' }}>
                    </div> </> : <LinearProgress style={{ margin: "2em" }} variant='primary' />
                }
            </div>
            <div className='col-lg-2 d-flex flex-column align-items-start' style={{ marginTop: '10px' }}>
            </div>
        </div>
    )
}

export default UserBook