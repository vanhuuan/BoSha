import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import BookCard2 from '../../components/book/BookCard2'
import { useNavigate } from 'react-router-dom';
import { userBookService } from '../../services/userBook.services';
import '../../css/userbook.css'
import { Button, Grid, Pagination } from '@mui/material';

const UserBook = () => {
    const [searchInput, setSearchInput] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [searchSent, setSearchSent] = useState(false)
    const [mangaList, setMangaList] = useState({
        "total": 81,
        "pageIndex": 1,
        "pageSize": 10,
        "data": []
    })
    const [data, setData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    let pageNumber = searchParams.get("pageNumber")

    let navigate = useNavigate();

    const onPageChange = (e, page) => {
        console.log(page)
        navigate("/book/UserBook",
            {
                pageNumber: page
            })
    }


    useEffect(() => {
        const load = async () => {
            if (!pageNumber) {
                pageNumber = 1
            }
            const rs = await userBookService.userBook(pageNumber, 10, "Name", "fghdf", "CreateDate", "Desc");
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

    const onSearchInputChange = e => {
        setSearchInput(e.target.value)
        if (e.target.value.length === 0) {
            setSearchSent(false)
        }
    }

    return (
        <div className='homePage container-fluid'>

            <div className='row'>
                <div className='col-lg-12'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setSearchSent(true)
                    }}>
                        <input type="text" value={searchInput} onChange={onSearchInputChange} placeholder='Search Mangas' className='searchManga' />
                    </form>
                </div>
            </div>

            <div className='row d-flex flex-row'>
                <div className='col-1'></div>
                {isLoading == false ? <>
                    <div className='col-10 position-relative'>
                        <Grid container spacing={2}>
                            
                                {
                                    data.map((item, index) => {
                                        return <Grid item xs={6} sm={4} md={2}>
                                                <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover }} />
                                            </Grid>
                                    })
                                }
                            
                        </Grid>
                    </div>
                    <div className='row d-flex justify-content-center flex-wrap' style={{ marginTop: '4em' }}>
                        <Pagination page={mangaList.pageIndex} count={mangaList.total} variant="outlined" shape="rounded" />
                    </div> </> : <></>
                }
            </div>
            <div className='col-lg-2 d-flex flex-column align-items-start' style={{ marginTop: '10px' }}>
                <Button id="addBook" href="/book/addBook" variant="contained">Thêm truyện mới</Button>
            </div>
        </div>
    )
}

export default UserBook