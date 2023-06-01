import React from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from 'react-router-dom';
import '../../css/bookcard.css'

const BookCard = (props) => {
    let navigate = useNavigate()
    const mangaName = (name) => {
        const newName = []
        name.split(' ').forEach(item => {
            newName.push(item.charAt(0).toUpperCase() + item.slice(1))
        })
        return(newName.join(' '))
    }

    const handleChoseBook = (e) => {
        navigate("/book/"+props.manga.id)
    }

    return (
        <>
            <div className='mangaCard' onClick={handleChoseBook}>
                <img src={`${props.manga.image}`} alt={props.manga.name} style={{width: '5em', height: '7em'}}/>
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