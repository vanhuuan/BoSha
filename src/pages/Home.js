import React, { useEffect, useState } from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";
import EditorImage from '../components/editor/editor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BorderAll } from '@mui/icons-material';
import { Grid } from '@mui/material';
import BookCard2 from '../components/book/BookCard2';
import { useSearchParams } from 'react-router-dom';
import { userBookService } from '../services/userBook.services';
import CircularProgress from '@mui/material/CircularProgress';


const Home = () => {
  let navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState({
    "total": 81,
    "pageIndex": 1,
    "pageSize": 10,
    "data": []
  })
  const [data, setData] = useState([])

  useEffect(() => {
    const load = async () => {
      if (!pageNumber) {
        pageNumber = 1
      }
      const rs = await userBookService.userBook(pageNumber, 12, "Name", "fghdf", "CreateDate", "Desc");
      console.log(rs.data)
      if (rs) {
        setMangaList(rs.data)
        setData(rs.data.data)
      }
    }

    setIsLoading(true)
    load().catch(console.error)
    setIsLoading(false)
  }, [])

  const [searchParams, setSearchParams] = useSearchParams();
  let pageNumber = searchParams.get("pageNumber")

  return (
    <div className='container'>
      <div className='row'>
        <Grid container spacing={2}>
          {
            data.map((item, index) => {
              return <Grid item xs={3} sm={2} md={1}>
                <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover }} />
              </Grid>
            })
          }
        </Grid>
      </div>
      <div className='row d-flex flex-row' style={{ marginTop: "2em" }}>
        <div className='col-1'></div>
        {isLoading === false ? <>
          <div className='col-10 position-relative'>
            <Grid container spacing={2}>
              {
                data.map((item, index) => {
                  return <Grid item xs={6} sm={4} md={2}>
                    <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover }} />
                  </Grid>
                })
              }
            </Grid>
          </div>
        </> : <>
          <CircularProgress color="success" />
        </>
        }
        <div className='col-1'></div>
      </div>
    </div>
  )
}

export default Home
