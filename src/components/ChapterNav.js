import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useParams } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import "../css/ChapterNav.css";
import { useNavigate } from "react-router-dom";
import { chapterService } from "../services/chapter.services";

const ChapterNav = (props) => {
    const { book, _ } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const id = props.chapter.book;
    const chapId = props.chapter.chap;
    const [next, setNext] = React.useState({
        id: chapId,
        name: "null"
    });
    const [pre, setPre] = React.useState({
        id: chapId,
        name: "null"
    })
    const resultRef = props.resultRef
    const [chapters, setChapters] = React.useState([])
    let navigate = useNavigate()
    const load = async () => {
        console.log(id)
        const rs = await chapterService.chapters(id);
        console.log(rs)
        var data = []
        if (rs.data) {
            data = rs.data.filter(x => x.state === true)
            setChapters(data)
        }
        
        for (var i = 0; i < data.length; i++) {

            if (data[i].chapterId === chapId) {
                if (i - 1 >= 0) {
                    setPre({
                        id: data[i - 1].chapterId,
                        name: data[i - 1].chapterName
                    })
                }
                if (i + 1 < data.length) {
                    setNext({
                        id: data[i + 1].chapterId,
                        name: data[i + 1].chapterName
                    })
                }
            }
        }
        setIsLoading(false)
    }

    const onChange = (chap) => {
        props.parentCallback(chap)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div class="chapter-nav">
            <Link to={`/book/${id}`} className="chapter-nav__icon">
                <HomeIcon></HomeIcon>
            </Link>
            {pre.id === chapId ?
                <button className="chapter-nav__page" style={{ backgroundColor: "gray" }}>
                    &#8249;
                </button> : <button className="chapter-nav__page" onClick={(e) => {
                    navigate(`/chapter/${book}/${pre.name.replaceAll(" ", "-")}-${pre.id}`);
                    onChange(pre)
                }}>
                    &#8249;
                </button>
            }

            <Select
                displayEmpty
                className="chapter-nav__select-item"
                value={chapId}
            >
                {isLoading === false ?
                    chapters.map((item) => {
                        if (item.state === false) {
                            return <></>
                        } else
                            return <MenuItem onClick={(e) => {
                                navigate(`/chapter/${book}/${item.chapterName.replaceAll(" ", "-")}-${item.chapterId}`);
                                onChange({
                                    "id": item.chapterId
                                })
                            }}
                                value={item.chapterId} key={item.chapterId}>
                                {`${item.chapterNumber} - ${item.chapterName}`}
                            </MenuItem>
                    }) : <></>}
            </Select>
            {next.id === chapId ?
                <button className="chapter-nav__page" style={{ backgroundColor: "gray" }}>
                    &#8250;
                </button> : <button className="chapter-nav__page" onClick={(e) => {
                    navigate(`/chapter/${book}/${next.name.replaceAll(" ", "-")}-${next.id}`);
                    onChange(next)
                }}>
                    &#8250;
                </button>
            }
            <button className="chapter-nav__comment" onClick={() => { resultRef.current.scrollIntoView({ behavior: "smooth" }) }}>
                <ChatBubbleIcon style={{ fontSize: `18px` }}></ChatBubbleIcon>
                <span className="chapter-nav__comment-text">Bình luận</span>
            </button>
        </div >
    );
}

export default ChapterNav;