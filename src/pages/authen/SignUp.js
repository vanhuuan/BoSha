import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
// import './login.css'
import { Box, Button, TextField, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { Typography } from '@mui/material';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import { Divider } from '@mui/material';
import { authService } from '../../services/auth.services';
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { NotificationManager } from 'react-notifications';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const SignUp = () => {
  let navigate = useNavigate()

  let cleintId = "156185449724-pillmeqb703h7ops42o9n80bh9agkckd.apps.googleusercontent.com"

  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [notifyText, setNotifyText] = useState('')

  const [checkPass, setCheckPass] = useState(false)
  const [checkMail, setCheckMail] = useState(false)

  function isValidPassword(pass) {
    return /^([a-zA-Z]*\d*).{10,}/.test(pass);
  }

  function isValidEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  const validate = (key, values) => {
    // const EMAIL_FORMAT = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    // const PASSWORD_FORMAT = /^([a-zA-Z]*\d*).{10,}/
    if(key === "userName" || userName.length > 30){
        NotificationManager.error('Tên không hợp lệ')
        return true
    }
    if (key === 'email' && !isValidEmail(values)) {
      NotificationManager.error('Email không hợp lệ')
      return true
    }
    if (key === 'password' && !isValidPassword(values)) {
      NotificationManager.error('Mật khẩu phải có ít nhất 10 ký tự, có ký tự chữ, ký tự số và ký tự đặc biệt')
      return true
    }
    return false
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleSignUp() {
    let account = {
      name: userName,
      email: email,
      password: password
    }
    if (!email || !password) {
      setNotifyText('Hãy nhập đầy đủ thông tin')
      return
    }
    if (validate('email', email)) {
      NotificationManager.error("Lỗi định dạng email", "Lỗi định dạng", 5000)
      return
    }
    if (validate('password', password)) {
      NotificationManager.error("Lỗi định dạng mật khẩu", "Lỗi định dạng", 5000)
      return
    }
    try {
      const login = await authService.register(account);
      if(login.status >= 200 && login.status < 300){
        NotificationManager.error("Đăng ký thành công", "Thành công", 5000)
        navigate("/login")
        handleClickOpen()
      }else{
        NotificationManager.error("Đăng ký không thành công", "Email đã tồn tại", 5000)
        setNotifyText('Email đã tồn tại!!')
      }
    } catch (error) {
      NotificationManager.error("Có lỗi xảy ra", "Lỗi đã xảy ra", 5000)
      console.log(error.response.data)
    }
  }

  async function handleSignUpGoogle(rs) {
    let account = {
        tokenId: rs.credential,
    }
    try {
      const login = await authService.registerGoogle(account);
      if(login.status >= 200 && login.status < 300){
        console.log(login.data)
        if(login.data){
            navigate('/changePass?email='+login.data.email+"&token="+login.data.accessToken)
        }else{
            handleClickOpen()
        }
      }else{
        NotificationManager.error("Đăng ký không thành công", "Email đã tồn tại", 5000)
        setNotifyText('Email đã tồn tại!!')
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <div>
      <form>
        <Box display="flex"
          flexDirection={"column"}
          maxWidth={350}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          backgroundColor='white'
          boxShadow={'0px 0px 10px #7D7D7E'}>
          <Typography variant='h5' padding={1}>Xin chào <br/>Bạn hãy đăng ký BoSha để tiếp tục đọc những mẫu truyện thú vị nhé.</Typography>
          <TextField
            fullWidth
            size='small' margin="normal" type={'text'} variant='outlined' placeholder='Tên của bạn'
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineSharpIcon sx={{ color: "#4F709C" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            fullWidth
            size='small' margin="normal" type={'email'} variant='outlined' placeholder='Email'
            onChange={(e) => { 
              isValidEmail(e.target.value) ? setCheckMail(true) : setCheckMail(false)
              setEmail(e.target.value)} 
            }
            error = {!checkMail}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#4F709C" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            fullWidth
            size='small' margin="normal" type={'password'} variant='outlined' placeholder='Mật khẩu'
            onChange={(e) => { 
              isValidPassword(e.target.value)? setCheckPass(true) : setCheckPass(false)
              setPassword(e.target.value)} 
            }
            helperText={'Mật khẩu phải có ít nhất 10 ký tự và không bắt đầu bằng ký tự đặc biệt'}
            error = {!checkPass}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon sx={{ color: "#4F709C" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <Button sx={{ marginTop: 2, borderRadius: 5, backgroundColor: "#4F709C", fontSize: 16, fontStyle: "bold" }} variant="contained" onClick={handleSignUp} >ĐĂNG KÝ</Button>
          <Typography sx={{ marginTop: 2, fontSize: 13, fontStyle: "bold" }}>Nếu bạn đã có tài khoản, hãy <a sx={{marginTop: 2, fontSize: 13, fontStyle: "bold"}} href="/login">đăng nhập</a></Typography>
          <Divider sx={{margin:2}}>Hoặc</Divider>
          <GoogleOAuthProvider clientId={cleintId}>
            <GoogleLogin 
                    clientId={cleintId}
                    buttonText="Đăng ký với google"
                    onSuccess={ (rs) => { handleSignUpGoogle(rs) }}
                    onFailure={ (rs) => { console.log('Failed')}}
                    cookiePolicy={'single_host_origin'}    
                    isSignedIn={true}      
                />
            </GoogleOAuthProvider>
          <Typography color='error'>{notifyText}</Typography>
        </Box>
      </form>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Đăng ký thành công
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <CheckCircleOutlineIcon color='00ff00' />
          <Typography gutterBottom>
            Hãy kiểm tra email: {email} đã đăng ký để có hướng dẫn tiếp theo!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Oke
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div >
  )
}

export default SignUp
