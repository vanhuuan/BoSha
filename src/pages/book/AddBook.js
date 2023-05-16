import React, { useEffect, useState } from 'react'
import FileInput from '../../components/UploadImg';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import RadioPrice from '../../components/RadioPrice';
import MultipleSelect from '../../components/SelectMulti';
import EditorImage, { EditorDescription } from '../../components/editor/editor';
import Switch from '@mui/material/Switch';
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import '../../css/AddBook.css'
import { EditorState } from 'draft-js';
import { userBookService } from '../../services/userBook.services';
import { firebaseService } from '../../services/firebase.services';

const AddBook = () => {
  let navigate = useNavigate()
  const [name, setName] = useState("Tên truyện")
  const [price, setPrice] = useState(0)
  const [listCategory, setListCategory] = useState([])
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")

  const limitChar = 100;
  const handleChange = (e) => {
    if (e.target.value.toString().length >= 5 && e.target.value.toString().length <= limitChar) {
      setName(e.target.value);
    }
  };

  const addBook = () => {
    if (price < 0 || (price > 0 && price < 1000) || (price > 1000000)) {
      NotificationManager.error(name, 'Giá truyện phải là miễn phí hoặc từ 1.000 VND đến 1.000.000 VND', 1000);
      return;
    }
    if (name.length < 5 || name.length > 100) {
      NotificationManager.error(name, 'Tên truyện phải chứa từ 5 đến 100 ký tự', 1000);
      return;
    }
    if (desc.length < 50 || desc.length > 3000) {
      NotificationManager.error(name, 'Miêu tả phải chứa từ 50 đến 3000 ký tự', 1000);
      return;
    }
    const data = {
      "name": name,
      "categories": listCategory,
      "price": price
    }
    userBookService.addBook(data).then((rs) => {
      firebaseService.uploadPreview(rs.data.id, desc).then((rs2) => {
        firebaseService.uploadCover(rs.data.id, img).then((rs3) => {
          console.log(rs3)
          navigate(`/book/${rs.data.id}`)
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }).catch((err) => {
      console.log(err)
    })
  }

  const reset = (e) => {
    navigate(-1)
    setPrice(0)
  }

  const callbackPrice = (childData) => {
    setPrice(childData)
    console.log(childData)
  }

  const callbackCategory = (childData) => {
    setListCategory(childData)
    console.log(childData)
  }

  const callbackDesc = (childData) => {
    setDesc(childData)
    console.log(desc)
  }

  const callbackImg = (childData) => {
    setImg(childData)
    console.log(childData)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            {/* <div>xs=2</div> */}
          </Grid>
          <Grid item xs={10}>
            <div className='container'>
              <div className='container-header'>
                <Typography variant='h5'> Thêm truyện mới </Typography>
              </div>
              <div className='container-body'>
                <Grid container spacing={2}>
                  <Grid item md={3} sm={12}>
                    <FileInput book={{ img: "" }} parentCallback={callbackImg}>
                    </FileInput>
                  </Grid>
                  <Grid item md={9} sm={12} width="100%">
                    <div style={{ marginTop: 2 + 'em' }}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Tên truyện"
                        className='input-text'
                        defaultValue={name}
                        onChange={(e) => { handleChange(e) }}
                        inputProps={{ maxLength: 50 }}
                        error={name.length < 5 || name.length > 100}
                        helperText="Tên truyện phải từ 5 đến 100 ký tự"
                      />
                    </div>
                    <MultipleSelect parentCallback={callbackCategory}></MultipleSelect>
                    <div sx={{ marginTop: '4px' }}>
                      <RadioPrice book={{ price: price }} parentCallback={callbackPrice}></RadioPrice>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div>
              <EditorDescription sx={{ margin: 100, border: '1px solid black' }} book={{ text: "<p></p>" }} parentCallback={callbackDesc} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0' }}>
              <Button variant="contained" color='success' sx={{ width: '10em' }} onClick={addBook}>Thêm truyện</Button>
              <Button variant="contained" color='error' sx={{ width: '10em' }} onClick={reset}>Trở về</Button>
            </div>
          </Grid>
          <Grid item xs={1}>
            {/* <div>xs=2</div> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AddBook