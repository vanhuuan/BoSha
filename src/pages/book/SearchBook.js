import { Box, Grid, Typography, FormGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";
import { userBookService } from "../../services/userBook.services";
import { useEffect } from "react";
import { bookService } from "../../services/books.services";
import BookCard2 from "../../components/book/BookCard2";
import { CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBook() {
    const [isLoadingCate, setIsLoadingCate] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [sortBy, setSortBy] = useState("New")
    const [state, setState] = useState("All")
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchSent, setSearchSent] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

    const load = async () => {
        setIsLoadingCate(true)
        setIsLoading(true)
        const rs = await userBookService.categories();
        console.log(rs)
        if (rs) {
            setCategories(rs.data)
            setIsLoadingCate(false)
        }
        bookService.booksNew(pageNumber, 12, "Name", "fghdf").then((rs) => {
            console.log(rs.data.data)
            setData(rs.data.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        load()
    }, [])

    const onSearchInputChange = e => {
        setSearchInput(e.target.value)
        if (e.target.value.length === 0) {
            setSearchSent(false)
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`}>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <div style={{ margin: "1em 0" }}>
                        <Typography>Thể loại</Typography>
                        <FormGroup>
                            {isLoadingCate === false ? <div>
                                {categories.map((cate) => (
                                    <FormControlLabel control={<Checkbox />} label={cate.name} sx={{ width: "8em" }} />
                                ))}
                            </div> : <></>}
                        </FormGroup>
                    </div>
                    <div style={{ margin: "1em 0" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <InputLabel id="demo-simple-select-helper-label">Xắp xếp theo</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sortBy}
                                    label="Xắp sếp theo"
                                    onChange={(e) => { setSortBy(e.target.value) }}
                                    sx={{ minWidth: "20em" }}
                                >
                                    <MenuItem value={"New"}>Cập nhất mới</MenuItem>
                                    <MenuItem value={"HotAll"}>Xem nhiều nhất</MenuItem>
                                    <MenuItem value={"HotDay"}>Xem nhiều nhất hôm nay</MenuItem>
                                    <MenuItem value={"HotWeek"}>Xem nhiều nhất tuần</MenuItem>
                                    <MenuItem value={"HotMonth"}>Xem nhiều nhất tháng</MenuItem>
                                    <MenuItem value={"MostFollow"}>Theo dõi nhiều nhất</MenuItem>
                                    <MenuItem value={"MostComment"}>Bình luận nhiều nhất</MenuItem>
                                    <MenuItem value={"MostChapter"}>Số chapter nhiều</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <InputLabel id="state">Tình trạng</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={state}
                                    label="Xắp sếp theo"
                                    onChange={(e) => { setState(e.target.value) }}
                                    sx={{ minWidth: "20em" }}
                                >
                                    <MenuItem value={"All"}>Tất cả</MenuItem>
                                    <MenuItem value={"Unfinish"}>Chưa hoàn thành</MenuItem>
                                    <MenuItem value={"Finish"}>Đã hoàn thành</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                setSearchSent(true)
                            }}>
                                <input type="text" value={searchInput} onChange={onSearchInputChange} placeholder='Tên sách' className='searchManga' />
                                <IconButton> <Search></Search> Tìm kiếm</IconButton>
                            </form>
                        </div>
                    </div>
                    <div style={{ margin: "1em 0" }}>
                        <Grid container spacing={2}>
                            {
                                isLoading === false ? data.map((item, index) => {
                                    return <Grid item xs={6} sm={4} md={2}>
                                        <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: 100 }} />
                                    </Grid>
                                }) : <CircularProgress />
                            }
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </Box>
    )
}