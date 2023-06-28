import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../css/BookCard2.css";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";

const UserBookCard = (props) => {

    let navigate = useNavigate()
    var [state, setState] = useState("Bị chặn")
    const mangaName = (name) => {
        const newName = []
        name.split(' ').forEach(item => {
            newName.push(item.charAt(0).toUpperCase() + item.slice(1))
        })
        return (newName.join(' '))
    }

    useEffect(() => {
        switch(props.manga.state){
            case "Unfinish": setState("Chưa hoàn thành"); break;
            case "Finish": setState("Đã hoàn thành"); break;
            case "Susspend": setState("Tạm dừng"); break;
            case "Block": setState("Bị chặn"); break;
        }
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
                        {state}
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

export default UserBookCard;