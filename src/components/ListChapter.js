import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import "../css/ListChapter.css";
import { chapterService } from '../services/chapter.services';
import { useNavigate } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function ListChapter(props) {
  const [chapters, setChapters] = React.useState([])
  const [canEdit, setCanEdit] = React.useState(false)
  const [canBuyed, setBuyed] = React.useState(false)
  const [showMore, setShowMore] = useState(false)

  let navigate = useNavigate()
  const load = async () => {
    console.log(props.book.id)
    console.log("canedit", props.book.canEdit)
    setBuyed(props.book.canBuyed)
    setCanEdit(props.book.canEdit)
    console.log(props.book.canBuyed)
    const rs = await chapterService.chapters(props.book.id);
    console.log(rs)

    if (rs) {
      if (props.book.canEdit !== true) {
        rs.data = rs.data.filter((x) => { return x.state === true })
      }
      setChapters(rs.data)
      if (rs.data.length > 10) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  const moment = require('moment');
  moment.updateLocale('vi', {
    relativeTime: {
      future: "%s",
      past: "%s",
      s: function (number, withoutSuffix, key, isFuture) {
        return "Vài giây trước"
      },
      ss: "Vài giây trước",
      m: "01 phút trước",
      mm: function (number, withoutSuffix, key, isFuture) {
        return (number < 10 ? '0' : '')
          + number + ' phút trước';
      },
      h: "một giờ trước",
      hh: "%d giờ trước",
      d: "một ngày trước",
      dd: "%d ngày trước",
      M: "một tháng trước",
      MM: "%d tháng trước",
      y: "một năm trước",
      yy: "%d năm trước"
    }
  });

  

  React.useEffect(() => {
    load()
  }, [])

  return (
    <List sx={{ width: '100%', bgcolor: '#F9F9F9', margin: 0 }}>
      {showMore === true ?
        chapters.slice(0, 10).map((value) => {
          const labelId = `checkbox-list-label-${value.chapterNumber}`;
          const date1 = new Date(value.updateDate);
          let a = moment().from(date1);
          return (
            <ListItem
              key={value}
              secondaryAction={
                <div style={{ display: "flex" }}>
                  {
                    canEdit === true ? <IconButton color='primary' onClick={(e) => {
                      e.preventDefault();
                      var data = {
                        bookId: props.book.id,
                        chapterId: value.chapterId
                      }
                      navigate(`/chapter/updateChapter`, { state: data })
                    }}> <BorderColorIcon /> </IconButton> : <> {
                      canBuyed || value.isDemo ? <ListItemText primary={a} sx={{ marginLeft: "0.5em" }} /> : <LockPersonIcon></LockPersonIcon>
                    }</>
                  }
                </div>
              }
              disablePadding
              className='chapter-item'

            >
              <ListItemButton className='list_Item_Button' role={undefined} dense onClick={(e) => {
                if (canBuyed || value.isDemo || canEdit){
                  navigate(`/chapter/${props.book.name.replaceAll(" ", "-")}-${props.book.id}/${value.chapterName.replaceAll(" ", "-")}-${value.chapterId}`)
                }else{
                  const data = { bookId: props.book.id, bookName: props.book.name }
                  navigate("/BuyBook", { state: data })
                }
              }}>
                <ListItemText id={labelId} primary={`${value.chapterNumber} - ${value.chapterName}`} />
              </ListItemButton>
            </ListItem>
          );
        })
        :
        chapters.map((value) => {
          const labelId = `checkbox-list-label-${value.chapterNumber}`;
          const date1 = new Date(value.updateDate);
          let a = moment().from(date1);
          return (
            <ListItem
              key={value}
              secondaryAction={
                <div style={{ display: "flex" }}>
                  {
                    canBuyed || value.isDemo || canEdit ? <ListItemText primary={a} sx={{ marginLeft: "0.5em" }} /> : <LockPersonIcon></LockPersonIcon>
                  }
                  {
                    canEdit === true ? <IconButton color='primary' onClick={(e) => {
                      e.preventDefault();
                      var data = {
                        bookId: props.book.id,
                        chapterId: value.chapterId
                      }
                      navigate(`/chapter/updateChapter`, { state: data })
                    }}> <BorderColorIcon /> </IconButton> : <></>
                  }
                </div>
              }
              disablePadding
              className='chapter-item'
            >
              <ListItemButton className='list_Item_Button' role={undefined} dense onClick={(e) => {
                if (canBuyed || value.isDemo || canEdit){
                  navigate(`/chapter/${props.book.name.replaceAll(" ", "-")}-${props.book.id}/${value.chapterName.replaceAll(" ", "-")}-${value.chapterId}`)
                }else{
                  const data = { bookId: props.book.id, bookName: props.book.name }
                  navigate("/BuyBook", { state: data })
                }
              }}>
                <ListItemText id={labelId} primary={`${value.chapterNumber} - ${value.chapterName}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      }
      {chapters.length < 10 ? <></> :
        <Typography textAlign={"center"} mt={"1em"}
          onClick={() => { setShowMore(!showMore) }}
          sx={{
            '&:hover': {
              backgroundColor: "#e6d7c3",
            },
            borderRadius: "10px",
            margin: "1em 25% 0",
            padding: "0.25em",
            cursor: "pointer"
          }}
        > {showMore === false ? "Ẩn bớt " : "Xem thêm"
          }</Typography>
      }
    </List >
  );
}