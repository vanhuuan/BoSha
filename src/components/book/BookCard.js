import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

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
        <div className='mangaCard'>
            <img src={`${props.manga.image}`} alt={props.manga.name} />
            <div>{mangaName(props.manga.name)}</div>
        </div>
    )
}

export default BookCard