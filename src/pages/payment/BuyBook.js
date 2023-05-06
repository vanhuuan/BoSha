import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import { PaymentOutlined } from "@mui/icons-material";
import { IconButton, Grid } from "@mui/material";
import { useEffect } from "react";
import { buyBookService } from "../../services/buybook.services";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const steps = ['Thông tin thanh toán'];

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const theme = createTheme();

const BuyBook = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    let navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const location = useLocation();
    const data = location.state;
    const bookId = data.bookId;
    const bookName = data.bookName

    const [checkoutInfo, setCheckoutInfo] = useState()
    const [buyLink, setBuyLink] = useState("")

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleBuyBook = () => {
        const data = {
            "bookId": bookId,
            "paymentMethod": "Paypal"
        }
        setIsLoading(true)
        buyBookService.buyBook(data).then((rs) => {
            setIsLoading(false)
            window.open(rs.data, '_top', 'noopener,noreferrer');
            setBuyLink(rs.data)
            setActiveStep(activeStep - 1);
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        buyBookService.checkOut(bookId).then((rs) => {
            console.log(rs)
            setCheckoutInfo(rs.data)
            setIsLoading(false)
            if (rs.data.buyLimk) {
                window.open(rs.data.buyLink, '_top', 'noopener,noreferrer');
            }
        }).catch((e) => {
            console.log(e)
            navigate(-1)
        })
    }, [])

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}
                >
                </AppBar>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Xác nhận thanh toán
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Cảm ơn bạn đã mua truyện của chúng tôi.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Truyện sẽ được thêm vào danh sách đã mua của bạn sau khi bạn thanh toán ngay sau đây.
                                    Nếu trang không tự động chuyển, hãy truy cập vào đường dẫn : {buyLink}
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box>
                                    {isLoading === false ?
                                        <Grid container spacing={2}>

                                            <Grid item xs={4}>
                                                <img src={checkoutInfo.cover} alt="ảnh truyện" style={{ maxWidth: "15em" }}></img>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div style={{ marginLeft: '3em' }}>
                                                    <Typography variant="h5" sx={{ marginBottom: "1em" }}><b>Người mua: </b>{checkoutInfo.userName}</Typography>
                                                    <Typography variant="h5" sx={{ marginBottom: "1em" }}><b>Truyện: </b>{checkoutInfo.bookName}</Typography>
                                                    <Typography variant="h5" sx={{ marginBottom: "1em" }}><b>Giá tiền: </b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(checkoutInfo.price)} </Typography>
                                                    <Button
                                                        id="demo-customized-button"
                                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        variant="contained"
                                                        disableElevation
                                                        onClick={handleClick}
                                                        endIcon={<KeyboardArrowDownIcon />}
                                                    >
                                                        <PaymentOutlined />
                                                        Phương thức thanh toán
                                                    </Button>
                                                    <StyledMenu
                                                        id="demo-customized-menu"
                                                        MenuListProps={{
                                                            'aria-labelledby': 'demo-customized-button',
                                                        }}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={handleClose} disableRipple selected={true}>
                                                            <EditIcon />
                                                            Paypal
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose} disableRipple disabled={true}>
                                                            <FileCopyIcon />
                                                            VNPay
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose} disableRipple disabled={true}>
                                                            <ArchiveIcon />
                                                            Momo
                                                        </MenuItem>
                                                    </StyledMenu>
                                                </div>
                                            </Grid>
                                        </Grid> : <CircularProgress></CircularProgress>
                                    }
                                    <div>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 3, ml: 1 }}
                                            color="warning"
                                            onClick={(e) => { navigate(-1) }}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleBuyBook}
                                            sx={{ mt: 3, ml: 1 }}
                                            color="success"
                                        >
                                            Mua truyện
                                        </Button>
                                    </div>
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default BuyBook