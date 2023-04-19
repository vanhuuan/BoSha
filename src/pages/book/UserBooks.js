import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import BookCard from '../../components/book/BookCard'
import { useNavigate } from 'react-router-dom';
import { userBookService } from '../../services/userBook.services';
import '../../css/userbook.css'
import { Button, Pagination } from '@mui/material';

var book = [{
    'name': 'Test',
    'image': 'https://lh3.googleusercontent.com/pw/AJFCJaU3cZhz5zpqqGJIAfVcwECMx-ELXUrg1a8xgKfNTl77IBXAyxHnBSppoMwgZAciA2Fq3aRgvNxxPo8awCfLCg8kTRcScqLgxbCRipggzagadpcoZckUsf84u-xO1lumuR3wjS1mPYRQQPhxn9U_f3vgNw=w697-h929-s-no?authuser=0',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://lh3.googleusercontent.com/pw/AJFCJaU3cZhz5zpqqGJIAfVcwECMx-ELXUrg1a8xgKfNTl77IBXAyxHnBSppoMwgZAciA2Fq3aRgvNxxPo8awCfLCg8kTRcScqLgxbCRipggzagadpcoZckUsf84u-xO1lumuR3wjS1mPYRQQPhxn9U_f3vgNw=w697-h929-s-no?authuser=0',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://lh3.googleusercontent.com/pw/AJFCJaU3cZhz5zpqqGJIAfVcwECMx-ELXUrg1a8xgKfNTl77IBXAyxHnBSppoMwgZAciA2Fq3aRgvNxxPo8awCfLCg8kTRcScqLgxbCRipggzagadpcoZckUsf84u-xO1lumuR3wjS1mPYRQQPhxn9U_f3vgNw=w697-h929-s-no?authuser=0',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://lh3.googleusercontent.com/pw/AJFCJaU3cZhz5zpqqGJIAfVcwECMx-ELXUrg1a8xgKfNTl77IBXAyxHnBSppoMwgZAciA2Fq3aRgvNxxPo8awCfLCg8kTRcScqLgxbCRipggzagadpcoZckUsf84u-xO1lumuR3wjS1mPYRQQPhxn9U_f3vgNw=w697-h929-s-no?authuser=0',
    'id': 1
}
]

const UserBook = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searchSent, setSearchSent] = useState(false)
    const [mangaList, setMangaList] = useState(book)
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

    const load = async () => {
        const rs = await userBookService.userBook(pageNumber, 10, "Name", " ", "CreateDate", "Desc");
        console.log(rs)
        if(rs){
            setMangaList(rs.data)
        }
    }

    useEffect(() => {
        load()
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

            <div className='row d-flex flex-row justify-content-between'>
                {/* <div className="col-lg-2"></div> */}
                <div className='col-lg-8 container-fluid' >
                    <div className='row'>
                        <div className='row d-flex flex-row justify-content-between'>
                            <div className='col-lg-12 d-flex justify-content-center flex-wrap' style={{ paddingTop: '20px' }}>
                                {
                                    mangaList.data.map((item, index) => {
                                        return <BookCard key={index} manga={{ name: item.name, id: item.id, image: item.cover }} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center flex-wrap' style={{ marginTop: '4em' }}>
                        <Pagination page={mangaList.pageIndex} count={mangaList.total} variant="outlined" shape="rounded" />
                    </div>
                </div>
                <div className='col-lg-2 d-flex flex-column align-items-start' style={{ marginTop: '10px' }}>
                    <Button id="addBook" href="/book/addBook" variant="contained">Thêm truyện mới</Button>
                </div>
            </div>
        </div>
    )
}

export default UserBook