import { Box, Card, Grid, TextField, Typography, styled, TableContainer, Paper, TableHead, TableBody, TableRow, Table, IconButton, CircularProgress, TablePagination } from "@mui/material";
import React from "react";
import { CardBookSummary, CardSummary } from "../../components/chart/CardSumary";
import { CardBar } from "../../components/chart/CardBar";
import { BarChart } from "../../components/chart/BarChart";
import { useNavigate } from "react-router-dom";
import Income from "../../components/chart/income";
import { useState } from "react";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { CalendarMonth, SkipNext, SkipPrevious } from "@mui/icons-material";
import abbrNum from "../../services/numberHelper";
import { useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'Lượt xem',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Doanh thu',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Đánh giá',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Số đánh giá',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Số chương',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, view, price, review, numOfReview, numOfChapter) {
    return { name, view, price, review, numOfReview, numOfChapter };
}

const gregorian_en_lowercase = {
    name: "gregorian_en_lowercase",
    months: [
      ["january", ""],
      ["february", ""],
      ["march", ""],
      ["april", ""],
      ["may", ""],
      ["june", ""],
      ["july", ""],
      ["august", ""],
      ["september", ""],
      ["october", ""],
      ["november", ""],
      ["december", ""],
    ],
    weekDays: [
      ["saturday", "thứ bảy"],
      ["sunday", "chủ nhật"],
      ["monday", "thứ hai"],
      ["tuesday", "thứ ba"],
      ["wednesday", "thứ tư"],
      ["thursday", "thứ năm"],
      ["friday", "thứ sáu"],
    ],
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    meridiems: [
      ["AM", "am"],
      ["PM", "pm"],
    ],
  };

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 1),
    createData('Eclair', 262, 16.0, 24, 6.0, 2),
    createData('Cupcake', 305, 3.7, 67, 4.3, 3),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 4)
];

export default function UserStatistic() {
    const [chartData, setChartData] = useState()
    const [showMore, setShowMore] = useState(true)
    const [month, setMonth] = useState(4)
    const [year, setYear] = useState(2023)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [values, setValues] = useState([
        new DateObject().subtract(4, "days"),
        new DateObject().add(4, "days")
    ])

    let navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setIsLoading(true)
        var dateObj = new Date();
        setMonth(dateObj.getUTCMonth() + 1)
        setYear(dateObj.getUTCFullYear())
        load()
    }, [])

    const load = async () => {
        setIsLoading(false)
    }
    return (
        <Box margin={`2em 0`} >
            {isLoading === false ?
                <Grid container spacing={3}>
                    <Grid xs={1}></Grid>
                    <Grid xs={10}>
                        <div className="container">
                            <div className='container-header' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "1em" }}>
                                <Typography variant='h5' onClick={(e) => { navigate("/user/userInfo") }} >Thông tin tài khoản </Typography>
                                <Typography variant='h5'>Thống kê truyện </Typography>
                            </div>
                            <Grid container spacing={3}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div style={{display: "flex"}}>
                                        <Typography>Khoảng thời gian thống kê từ </Typography>
                                        <DatePicker
                                            value={values}
                                            onChange={setValues}
                                            range
                                            dateSeparator=" đến " 
                                            style={{ width: '15em', margin: "0 1em"}}
                                        />
                                        <CalendarMonth/>
                                    </div>
                                </Grid>
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                    <CardSummary
                                        title="Tổng thu nhập từ bán truyện"
                                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(1000000)}
                                        footer={<div>  </div>}
                                    />
                                </Grid>
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                    <CardSummary
                                        title="Thu nhập thực tế của bạn "
                                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(800000)}
                                        footer={<div> 80% Tổng thu nhập từ bán truyện  </div>}

                                    />
                                </Grid>
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                    <CardBookSummary
                                        title="Truyện có doanh thu cao nhất"
                                        value={`Truyện có doanh thu cao nhất`}
                                        footer={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(800000)}
                                        img={`https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2F64524e67c851f42527dd44e0.jpg?alt=media&token=5ac70aff-b4fa-42ba-a30e-f449071e9a77`}
                                    />
                                </Grid>
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                    <CardBookSummary
                                        title="Truyện có lượt xem nhiều nhất"
                                        value={"Truyện vui vẻ"}
                                        footer={`${abbrNum(100000)} lượt xem`}
                                        img={`https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/users%2Fava%2F64524e67c851f42527dd44e0.jpg?alt=media&token=5ac70aff-b4fa-42ba-a30e-f449071e9a77`}
                                    />
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Income chartsData={chartData} title={`Thống kê lượt xem`} label={'lượt xem'}></Income>
                                </Grid>
                                {showMore ?
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>Tên truyện</StyledTableCell>
                                                        <StyledTableCell align="right">Lượt xem</StyledTableCell>
                                                        <StyledTableCell align="right">Doanh thu</StyledTableCell>
                                                        <StyledTableCell align="right">Đánh giá</StyledTableCell>
                                                        <StyledTableCell align="right">Lượt đánh giá</StyledTableCell>
                                                        <StyledTableCell align="right">Số chương</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right">{row.view.toLocaleString('en-US')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.price.toLocaleString('en-US')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.review.toLocaleString('en-US')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.numOfReview.toLocaleString('en-US')}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.numOfChapter.toLocaleString('en-US')}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 20]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Grid>
                                    : <></>}
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center" }}>
                                    <Typography variant="h7" textAlign={'center'} style={{ textAlign: "center" }} width={'100%'} onClick={(e) => setShowMore(!showMore)}>{showMore ? "Ẩn bớt" : "Xem thống kê chi tiết"}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid xs={1}></Grid>
                </Grid>
                : <CircularProgress />}
        </Box>
    )
}