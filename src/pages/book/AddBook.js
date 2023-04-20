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
              <div className='container-header'>
                <Typography variant='h5'> Thêm truyện mới </Typography>
              </div>
              <div className='container-body'>
                <Grid container spacing={2}>
                  <Grid item md={3} sm={12}>
                    <FileInput book={{ img: "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=DzMGtcl13N8AX9qVnFt&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCTbFjIJtxx95fbVv_a2YC3aqz-UnAsYygTnmr3920TrA&oe=644645D7" }}></FileInput>
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
              <EditorDescription sx={{ margin: 100, border: '1px solid black' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0' }}>
              <Button variant="contained" color='success' sx={{ width: '10em' }}>Thêm truyện</Button>
              <Button variant="contained" color='error' sx={{ width: '10em' }}>Reset</Button>
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