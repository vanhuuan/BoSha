import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../css/BookCard2.css";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";
import abbrNum from "../../services/numberHelper";
import { bookService } from "../../services/books.services";

const UserBuyBookCard = (props) => {

    let navigate = useNavigate()
    const [status, setStatus] = useState({
        "buyed": false,
        "liked": false,
        "canEdit": false,
        "price": 0
    })

    const mangaName = (name) => {
        const newName = []
        name.split(' ').forEach(item => {
            newName.push(item.charAt(0).toUpperCase() + item.slice(1))
        })
        return (newName.join(' '))
    }

    useEffect(() => {
        bookService.bookStatus(props.manga.id).then((rs) => {
            console.log("status", rs)
            setStatus(rs.data)
        }).catch((err) => {
            console.error("err load status", err)
        })
    }, [])

    const handleChoseBook = (e) => {
        navigate("/book/" + props.manga.name.replaceAll(" ", "-") + "-" + props.manga.id)
    }

    return (
        <>
            <div class="bookcard2-group" onClick={handleChoseBook} style={{ transform: `scale(1)` }}>
                <Link className="bookcard2-group__container">
                    <img className="bookcard2-group__img" src={`${props.manga.image}`}></img>
                    <div className="bookcard2-group__top-left">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                    .format(status.price)}
                    </div>
                    <div className="bookcard2-group__bottom from-transparent">
                        <div className="bookcard2-group__bottom-quantity">
                            <Star style={{ fontSize: `16px`, marginRight: `2px` }}></Star>
                            <span style={{ marginRight: `8px` }}>{props.manga.star}</span>
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

export default UserBuyBookCard;