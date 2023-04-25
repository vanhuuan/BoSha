import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CommentList from "../../components/CommentList";
import LinearProgress from '@mui/material/LinearProgress';
import { chapterService } from "../../services/chapter.services";
import { useParams } from "react-router-dom";

const data = {
    "bookId": "643656848e27bd8b116546e9",
    "chapterId": "643656888e27bd8b116546fa",
    "name": "Tập 17",
    "chapterNumber": 17,
    "created": "2023-04-12T06:58:16.574Z",
    "updated": "2023-04-12T06:58:16.574Z",
    "textLink": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656888e27bd8b116546fa.html?alt=media&token=776995dd-485f-48ed-ac04-8dcff7984a92"
}

const Chapter = () => {
    const { id } = useParams();
    const [chap, setChap] = useState("https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656868e27bd8b116546eb.html?alt=media&token=c30b3b69-47f7-487e-8410-1f3b0ec56b14")
    const [isLoading, setIsLoading] = useState(true)
    const [chapterDetail, setChapterDetail] = useState(data)

    const fetchChap = () => {
        setIsLoading(true)
        const rs = chapterService.chapterDetail(id)
        if(rs.data){
            console.log(rs.data)
            setChapterDetail(rs.data)
        }
    }

    useEffect(() => {
        fetchChap();
        setIsLoading(false)
    }, [])

    return (
        <Box>
            {isLoading == false ?
                <div>
                    <Typography>Tên truyện</Typography>
                    <Typography>Tên chapter</Typography>
                    <Typography>Độ dài, cập nhật, bình luận</Typography>
                    <iframe src={chap}
                        style={{ width: "100%", padding: "1em 2em"}}
                        scrolling="no"
                        frameBorder="0"></iframe>
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