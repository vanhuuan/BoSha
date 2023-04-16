import React, { useEffect } from 'react'
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

const AddBook = () => {
  let navigate = useNavigate()

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            {/* <div>xs=2</div> */}
          </Grid>
          <Grid item xs={10}>
            <div className='container'>
              <div className='container-body'>
                <div className='container-header'>
                  <Typography variant='h5'> Thêm truyện mới </Typography>
                </div>
                <Grid container spacing={2}>
                  <Grid item md={3} sm={12}>
                    <FileInput></FileInput>
                  </Grid>
                  <Grid item md={9} sm={12} width="100%">
                    <div style={{ marginTop: 2 + 'em' }}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Tên truyện"
                        className='input-text'
                      />
                    </div>
                    <MultipleSelect></MultipleSelect>
                    <div sx={{ marginTop: '4px' }}>
                      <RadioPrice></RadioPrice>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div>
             <EditorDescription sx={{margin: 100, border:'1px solid black'}}/>
            </div>
            <div style={{display: 'flex',  justifyContent: 'space-between', margin: '1em 0'}}>
              <Button variant="contained" color='success' sx={{marginRight: '1em', width: '10em'}}>Thêm truyện</Button>
              <Button variant="contained" color='error' sx={{marginRight: '1em', width: '10em'}}>Reset</Button>
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