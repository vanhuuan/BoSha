import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import "../css/ChapterNav.css";

const ChapterNav = (props) => {
    const [age, setAge] = React.useState("");
    const handleChange = (e) => {
        setAge(e.target.value);
    };
    return (
        <>
            <div class="chapter-nav">
                <Link to="/" className="chapter-nav__icon">
                    <HomeIcon></HomeIcon>
                </Link>
                <Link to="" className="chapter-nav__icon">
                    <ListIcon></ListIcon>
                </Link>
                <button className="chapter-nav__page">
                    &#8249;
                </button>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        className="chapter-nav__select-item"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                <button className="chapter-nav__page">&#8250;</button>
                <button className="chapter-nav__comment">
                    <ChatBubbleIcon style={{fontSize: `18px`}}></ChatBubbleIcon>
                    <span className="chapter-nav__comment-text">Comment</span>
                </button>
            </div >
        </>
    );
}

export default ChapterNav;