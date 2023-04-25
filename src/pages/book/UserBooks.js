import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import BookCard from '../../components/book/BookCard'
import { useNavigate } from 'react-router-dom';
import { userBookService } from '../../services/userBook.services';
import '../../css/userbook.css'
import { Button, InputLabel, NativeSelect, Pagination, MenuItem, Select } from '@mui/material';

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
            <div className='row'>
                <div className='col-lg-1'></div>
                <div className='col-lg-2' style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                    <span>
                        <Button id="addBook" href="/book/addBook" variant="contained" sx={{display: 'inline'}}>Thêm truyện mới</Button> 
                    </span>
                    <span>
                        <InputLabel id="demo-simple-select-helper-label">Sắp xếp</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Sắp xếp"
                        >
                            <MenuItem value="" selected>
                                <em>Mới nhất</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </span>
                </div>
                <div className='col-lg-1'></div>
            </div>
            <div className='row d-flex flex-row justify-content-between'>
                <div className="col-lg-1"></div>
                <div className='col-lg-10 container-fluid p-0 m-0' >
                    {isLoading == false ?
                        <div>
                            <div className='row'>
                                <div className='row d-flex flex-row'>
                                    <div className='col-lg-12 d-flex flex-wrap' style={{ paddingTop: '10px' }}>
                                        {
                                            data.map((item, index) => {
                                                return <BookCard key={index} manga={{ name: item.name, id: item.id, image: item.cover }} />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center flex-wrap' style={{ marginTop: '4em' }}>
                                <Pagination page={mangaList.pageIndex} count={mangaList.total} variant="outlined" shape="rounded" />
                            </div>
                        </div> : <></>
                    }
                </div>
                <div className="col-lg-1"></div>

            </div>
        </div>
    )
}

export default UserBook