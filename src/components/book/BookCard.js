import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import '../../css/bookcard.css'

const BookCard = (props) => {


    const mangaName = (name) => {
        const newName = []
        name.split(' ').forEach(item => {
            newName.push(item.charAt(0).toUpperCase() + item.slice(1))
        })
        return(newName.join(' '))
    }

    return (
        <>
            <div className='mangaCard'>
                <img src={`${props.manga.image}`} alt={props.manga.name} />
                <div className='name' style={{marginBottom: 5}}>
                    <div>
                        <FavoriteOutlinedIcon/> {100000} <RemoveRedEyeOutlinedIcon/> {1000000}
                    </div>
                    <div>
                        <UpdateOutlinedIcon/>5 Cập nhật Ngày trước
                    </div>
                </div>
                <div className='info'>
                    <div> {mangaName(props.manga.name)} </div>
                </div>
            </div>         
        </>
    )
}

export default BookCard