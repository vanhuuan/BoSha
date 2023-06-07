import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { useState } from 'react';
import { IconButton, Paper, Rating, Typography } from '@mui/material';
import Picker, { Categories, EmojiStyle, SuggestionMode } from 'emoji-picker-react';
import "../css/Comment.css";
import { commentService } from '../services/comment.services';
import { Delete, Edit } from '@mui/icons-material';
import { NotificationManager } from 'react-notifications';
import { confirm } from './prompt/Confirmation';
import { Textarea } from '@mui/joy';

function Comment(props) {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [showEmojis, setShowEmojis] = useState(false);
    const [text, setText] = React.useState('');
    const [isCommented, setIsCommented] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [commentEd, setCommentEd] = useState({
        "id": "645117b7b226be32c08b5dd6",
        "userName": "An Văn",
        "userAva": "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=38ZuJXyK0vQAX9RYvLL&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCXNr9EbTsX8oP2I05PTXF9MNHOdExve243Cw2gK5-XkA&oe=64327F57",
        "text": "hay lắm",
        "like": 0,
        "creatDate": "2023-05-02T14:01:27.582Z"
    })
    const [message, setMessage] = useState("")

    const id = props.chap.chapId

    const setInput = (texts) => {
        if (texts.length < 301) {
            setText(texts)
        }
        if (texts.length > 5) {
            setMessage("")
        }
    }

    React.useEffect(() => {
        setIsLoading(true)
        commentService.getUserChapterComment(id).then((rs) => {
            console.log("comment:", rs.data)
            setCommentEd(rs.data)
            setText(rs.data.text)
            setIsCommented(true)
            setIsLoading(false)
        }).catch((err) => {
            setIsCommented(false)
            console.log(err)
        })
    }, [])

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(text + emoji);
    };

    const sendComment = () => {
        if (edit === true) {
            sendEdit()
            return
        }
        if (text.length < 5) {
            NotificationManager.error("Lỗi nhập", "Độ dài tối thiểu 5 ký tự", 3000)
            return
        }
        var data = {
            "chapterId": id,
            "text": text
        }
        commentService.commentChapter(data).then(() => {
            setIsLoading(true)
            commentService.getUserChapterComment(id).then((rs) => {
                console.log("comment:", rs.data)
                setCommentEd(rs.data)
                setText(rs.data.text)
                setIsCommented(true)
                setIsLoading(false)
            }
            )
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteComment = async () => {
        if (await confirm("Bạn có chắc muốn xóa bình luận không!")) {
            commentService.deleteUserChapterComment(commentEd.id).then((rs) => {
                setText(" ")
                setIsCommented(false)
                setEdit(false)
            }).catch((e) => {
                console.log(e)
                NotificationManager.error("Có lỗi xảy ra khi xóa bình luận")
            })
        }
    }

    const onEditComment = () => {
        if (isCommented == true) {
            setIsCommented(false)
            setEdit(true)
        }
    }

    const sendEdit = () => {
        if (text.length < 5) {
            NotificationManager.error("Lỗi nhập", "Độ dài tối thiểu 5 ký tự", 3000)
            return
        }
        var data = {
            "id": commentEd.id,
            "text": text
        }
        commentService.updateCommentChapter(data).then((rs) => {
            setIsLoading(true)
            commentService.getUserChapterComment(id).then((rs) => {
                console.log("comment:", rs.data)
                setCommentEd(rs.data)
                setText(rs.data.text)
                setEdit(false)
                setIsCommented(true)
            }).catch((err) => {
                setIsCommented(true)
                console.log(err)
            }).finally(() => {
                setEdit(false)
                setIsLoading(false)
            })
        }).catch((err) => {
            setIsCommented(true)
            setEdit(false)
            console.log(err)
        })
    }

    return (
        <FormControl>
            {isCommented === false ? <>
                <FormLabel>Bình luận của bạn</FormLabel>

                <Textarea
                    minRows={3}
                    value={text}
                    onChange={(event) => setInput(event.target.value)}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: "auto"
                            }}
                        >
                            <button className="button" onClick={() => setShowEmojis(!showEmojis)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            {showEmojis && (
                                <div style={{ position: "absolute", zIndex: 1, top: `100%`, width: `50%` }}>
                                    <Picker onEmojiClick={addEmoji} searchDisabled skinTonesDisabled emojiStyle={EmojiStyle.GOOGLE} suggestedEmojisMode={SuggestionMode.None}
                                        categories={[
                                            {
                                                name: "Smiles & Emotions",
                                                category: Categories.SMILEYS_PEOPLE
                                            },]}
                                        previewConfig={{
                                            showPreview: false
                                        }}
                                        height={"20em"}
                                        width={"100%"} />
                                </div>
                            )}
                            <Typography level="body3" color={"red"}>
                                {message}
                            </Typography>
                            <Typography level="body3">
                                {text.length} / 300 từ
                            </Typography>
                            {edit === true ?
                                <Button sx={{}} onClick={() => { setIsCommented(true); setEdit(false); setText(commentEd.text) }}>Bỏ</Button>
                                : <></>}
                            <Button sx={{ ml: 'auto' }} onClick={sendComment}>Gửi</Button>
                        </Box>
                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                    }}
                /> </> : <> {isLoading === false ? <Textarea
                    minRows={3}
                    readOnly
                    endDecorator={
                        <Box sx={{ justifyContent: 'space-between' }}>
                            <IconButton color='error' onClick={deleteComment}>
                                <Delete />
                            </IconButton>
                            /
                            <IconButton color='primary' onClick={onEditComment}>
                                <Edit />
                            </IconButton>
                        </Box>
                    }
                    value={commentEd.text}
                    style={{ color: `black` }}>
                </Textarea> : <> </>
                }</>
            }
        </FormControl>
    );
}

function Review(props) {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [showEmojis, setShowEmojis] = useState(false);
    const [text, setText] = React.useState('');
    const [star, setStar] = React.useState(5);
    const [isReviewed, setIsReviewed] = useState(false)
    const [edit, setEdit] = useState(false)
    const [review, setReview] = useState({
        "id": "645117b7b226be32c08b5dd6",
        "userName": "An Văn",
        "userAva": "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=38ZuJXyK0vQAX9RYvLL&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCXNr9EbTsX8oP2I05PTXF9MNHOdExve243Cw2gK5-XkA&oe=64327F57",
        "text": "hay lắm",
        "like": 0,
        "star": 5,
        "creatDate": "2023-05-02T14:01:27.582Z"
    })
    const [message, setMessage] = useState("")

    const id = props.book.bookId

    const setInput = (texts) => {
        if (texts.length < 1001) {
            setText(texts)
        }
        if (texts.length < 5) {
            setMessage(" ")
        }
    }

    React.useEffect(() => {
        commentService.getUserBookReview(id).then((rs) => {
            console.log("review:", rs.data)
            setReview(rs.data)
            setText(rs.data.text)
            setStar(rs.data.star)
            setIsReviewed(true)
        }).catch((err) => {
            setIsReviewed(false)
            console.log(err)
        })
    }, [])

    const sendReview = () => {
        if (edit === true) {
            sendEdit()
            return
        }
        if (text.length < 5) {
            NotificationManager.error("Lỗi nhập", "Độ dài tối thiểu 5 ký tự", 3000)
            return
        }
        var data = {
            "bookId": id,
            "text": text,
            "star": star
        }
        commentService.reviewBook(data).then((rs) => {
            commentService.getUserBookReview(id).then((rs) => {
                console.log("comment:", rs.data)
                setReview(rs.data)
                setIsReviewed(true)
            }).catch((err) => {
                setIsReviewed(false)
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(text + emoji);
    };

    const deleteReview = async () => {
        if (await confirm("Bạn có chắc muốn xóa review ?")) {
            commentService.deleteUserBookReview(review.id).then((e) => {
                setIsReviewed(false)
                setEdit(false)
                setStar(5)
                setEdit(false)
            }).then((e) => {
                console.log(e)
                NotificationManager.error("Có lỗi khi xóa đánh giá")
            })
        }
    }

    const onEditReview = () => {
        if (isReviewed == true) {
            setIsReviewed(false)
            setEdit(true)
        }
    }

    const sendEdit = () => {
        if (text.length < 5) {
            NotificationManager.error("Lỗi nhập", "Độ dài tối thiểu 5 ký tự", 3000)
            return
        }
        var data = {
            "id": review.id,
            "text": text,
            "star": star
        }
        commentService.updateReviewBook(data).then((rs) => {
            commentService.getUserBookReview(id).then((rs) => {
                console.log("comment:", rs.data)
                setReview(rs.data)
                setIsReviewed(true)
            }).catch((err) => {
                setIsReviewed(false)
                console.log(err)
            }).finally(() => {
                setEdit(false)
            })
        }).catch((err) => {
            setEdit(false)
            console.log(err)
        })
    }

    return (
        <FormControl>
            <FormLabel>Đánh giá của bạn cho bộ sách này</FormLabel>
            {isReviewed === false ?
                <Textarea
                    minRows={3}
                    value={text}
                    onChange={(event) => setInput(event.target.value)}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                justifyContent: "space-between",
                                flex: "auto"
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <button className="button" onClick={() => setShowEmojis(!showEmojis)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                {showEmojis && (
                                    <div style={{ position: "absolute", zIndex: 1, top: `100%`, width: `50%` }}>
                                        <Picker onEmojiClick={addEmoji} searchDisabled skinTonesDisabled emojiStyle={EmojiStyle.GOOGLE} suggestedEmojisMode={SuggestionMode.None}
                                            categories={[
                                                {
                                                    name: "Smiles & Emotions",
                                                    category: Categories.SMILEYS_PEOPLE
                                                },]}
                                            previewConfig={{
                                                showPreview: false
                                            }}
                                            height={"10em"}
                                            width={"100%"} />
                                    </div>
                                )}
                                <Typography level="body3" color={"red"}>
                                    {message}
                                </Typography>
                                <Typography level="body3">
                                    {text.length} / 1000 từ
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={star}
                                    onChange={(event, newValue) => {
                                        setStar(newValue);
                                    }}
                                />
                            </div>
                            {edit === true ?
                                <Button sx={{}} onClick={() => { setIsReviewed(true); setEdit(false); setText(review.text) }}>Bỏ</Button>
                                : <></>}
                            <Button sx={{ marginRight: "1em" }} onClick={sendReview}>Gửi</Button>
                        </Box>
                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                    }}
                />
                : <Textarea value={review.text}
                    readOnly
                    endDecorator={
                        <Box sx={{ justifyContent: 'space-between' }}>
                            <Rating
                                name="simple-controlled"
                                value={review.star}
                                readOnly
                            />
                            <Box>
                                <IconButton color='error' onClick={deleteReview}>
                                    <Delete /> 
                                </IconButton>
                                /
                                <IconButton color='primary' onClick={onEditReview}>
                                    <Edit />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                    style={{ color: `black` }}>
                </Textarea>}
        </FormControl>
    );
}

export { Comment, Review }