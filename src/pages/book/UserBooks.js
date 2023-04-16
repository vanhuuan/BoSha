import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BookCard from '../../components/book/BookCard'
import { useNavigate } from 'react-router-dom';

import '../../css/userbook.css'
import { Button } from '@mui/material';

var book = [{
    'name': 'Test',
    'image': 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YGjrBjbapT8AX8jRZAJ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDegp71Nyok3qcGoMHWhK7omg5voETDGVVnfFd6yDvaCw&oe=643C6297',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YGjrBjbapT8AX8jRZAJ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDegp71Nyok3qcGoMHWhK7omg5voETDGVVnfFd6yDvaCw&oe=643C6297',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YGjrBjbapT8AX8jRZAJ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDegp71Nyok3qcGoMHWhK7omg5voETDGVVnfFd6yDvaCw&oe=643C6297',
    'id': 1
},
{
    'name': 'Test',
    'image': 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YGjrBjbapT8AX8jRZAJ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDegp71Nyok3qcGoMHWhK7omg5voETDGVVnfFd6yDvaCw&oe=643C6297',
    'id': 1
}
]

const UserBook = () => {

    const [searchInput, setSearchInput] = useState('')
    const [searchSent, setSearchSent] = useState(false)
    const [mangaList, setMangaList] = useState(book)

    let navigate = useNavigate();

    useEffect(() => {

    }, [])

    const onSearchInputChange = e => {
        setSearchInput(e.target.value)
        if (e.target.value.length === 0) {
            setSearchSent(false)
        }
    }

    const addBook = () => {
        navigate('/book/addBook')
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
                                    mangaList.map((item, index) => {
                                        return <BookCard key={index} manga={{ name: item.name, id: item.id, image: item.image }} />
                                    })
                                }
                            </div>
                        </div>
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