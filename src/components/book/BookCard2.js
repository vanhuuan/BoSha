import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../css/BookCard2.css";
import { useNavigate } from "react-router-dom";

const BookCard2 = (props) => {

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
            <div class="bookcard2-group" onClick={handleChoseBook}>
                <Link className="bookcard2-group__container">
                    <img className="bookcard2-group__img" src={`${props.manga.image}`}></img>
                    <div className="bookcard2-group__top-left">
                        Chapter 297
                    </div>
                    <div className="bookcard2-group__bottom from-transparent">
                        <div className="bookcard2-group__bottom-quantity">
                            <FavoriteIcon style={{ fontSize: `16px`, marginRight: `2px` }}></FavoriteIcon>
                            <span style={{marginRight: `8px`}}>{props.manga.star}</span>
                            <VisibilityIcon style={{ fontSize: `16px`, marginRight: `2px` }}></VisibilityIcon>
                            <span>{props.manga.view}</span>
                        </div>
                        <div className="bookcard2-group__bottom-name">
                            {mangaName(props.manga.name)}
                        </div>
                    </div>
                </Link>
            </div >
        </>
    );
}

export default BookCard2;