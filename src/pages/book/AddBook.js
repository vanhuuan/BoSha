import React, { useEffect, useState } from 'react'
import FileInput from '../../components/UploadImg';
import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import RadioPrice from '../../components/RadioPrice';
import MultipleSelect from '../../components/SelectMulti';
import EditorImage, { EditorDescription } from '../../components/editor/editor';
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";

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

  const limitChar = 50;
  const handleChange = (e) => {
    if (e.target.value.toString().length <= limitChar) {
      setName(e.target.value);
    }
  };

  const addBook = () => {
    const data = {
      "name": name,
      "categories": listCategory,
      "price": price
    }
    userBookService.addBook(data).then((rs) => {
      firebaseService.uploadPreview(rs.data.Id, desc).then((rs2) => {
        console.log(rs2)
        firebaseService.uploadCover(rs.data.Id, img).then((rs3) => {
          console.log(rs3)
          navigate(`/book/${rs.data.Id}`)
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }).catch((err) => {
      console.log(err)
    })
  }

  const reset = (e) => {
    setName("Tên truyện")
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
    console.log(childData)
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
                    <FileInput book={{ img: "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg" }} parentCallback={callbackImg}>

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
                        onChange={(e) => { handleChange(e)}}
                        inputProps={{ maxLength: 50 }}
                      />
                    </div>
                    <MultipleSelect parentCallback={callbackCategory}></MultipleSelect>
                    <div sx={{ marginTop: '4px' }}> 
                      <RadioPrice book={{ price: price}} parentCallback={callbackPrice}></RadioPrice>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div>
              <EditorDescription sx={{ margin: 100, border: '1px solid black' }} parentCallback={callbackDesc}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0' }}>
              <Button variant="contained" color='success' sx={{ width: '10em' }} onClick={addBook}>Thêm truyện</Button>
              <Button variant="contained" color='error' sx={{ width: '10em' }} onClick={reset}>Reset</Button>
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