import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CommentList from "../../components/CommentList";
import LinearProgress from '@mui/material/LinearProgress';
import ChapterNav from "../../components/ChapterNav";



const Chapter = () => {
    const [chap, setChap] = useState("https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656868e27bd8b116546eb.html?alt=media&token=c30b3b69-47f7-487e-8410-1f3b0ec56b14")
    const [isLoading, setIsLoading] = useState(true)

    const fetchChap = () => {
        setIsLoading(true)
    }

    useEffect(() => {
        fetchChap();
        setIsLoading(false)
    }, [])

    return (
        <Box>
            {isLoading === false ?
                <div>
                    <Typography>Tên truyện</Typography>
                    <Typography>Tên chapter</Typography>
                    <Typography>Độ dài, cập nhật, bình luận</Typography>
                    <ChapterNav></ChapterNav>
                    <iframe src={chap}
                        style={{ width: "100%", padding: "1em 2em"}}
                        scrolling="no"
                        frameBorder="0"
                        title="chapter"></iframe>
                </div> :
                <>
                    <LinearProgress />
                </>
            }
            <CommentList></CommentList>
        </Box>
    )
}

export default Chapter