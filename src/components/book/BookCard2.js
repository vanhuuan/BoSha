import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../css/BookCard2.css";
import { useNavigate } from "react-router-dom";
import { MoneyOff, Paid, PaidOutlined, PaidTwoTone, Star } from "@mui/icons-material";
import { bookService } from "../../services/books.services";

const BookCard2 = (props) => {

    let navigate = useNavigate()
    const mangaName = (name) => {
        const newName = []
        name.split(' ').forEach(item => {
            newName.push(item.charAt(0).toUpperCase() + item.slice(1))
        })
        return (newName.join(' '))
    }

    const [status, setStatus] = useState({
        "buyed": false,
        "liked": false,
        "canEdit": false,
        "price": 0
    })

    const handleChoseBook = (e) => {
        navigate("/book/" + props.manga.name.replaceAll(" ", "-") + "-" + props.manga.id)
    }

    useEffect(() => {
        bookService.bookStatus(props.manga.id).then((rs) => {
            console.log("status", rs)
            setStatus(rs.data)
        }).catch((err) => {
            console.error("err load status", err)
        })
    }, [])

    return (
        <>
            <div class="bookcard2-group" onClick={handleChoseBook}>
                <Link className="bookcard2-group__container">
                    <img className="bookcard2-group__img" src={`${props.manga.image}`}></img>
                    <div className="bookcard2-group__top-left">
                        Tập {props.manga.index}
                    </div> 
                    <div className="bookcard2-group__top-right">
                        { status.liked === true ? <FavoriteIcon sx={{ color: '#d62f51'}}/> : <> { status.buyed === true && status.price != 0 ? <PaidTwoTone sx={{ color: "#3e9c35"}}/> : <> </> }</> }
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

export default BookCard2;