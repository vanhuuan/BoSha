import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import "../css/ListChapter.css";
import { chapterService } from '../services/chapter.services';

export default function ListChapter(props) {
  const [checked, setChecked] = React.useState([0]);
  const [chapters, setChapters] = React.useState([])
  const load = async () => {
    console.log(props.book.id)
    const rs = await chapterService.chapters(props.book.id);
    console.log(rs)
    if(rs){
      setChapters(rs.data)
    }
  }

  React.useEffect(() => {
    load()
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {chapters.map((value) => {
        const labelId = `checkbox-list-label-${value.chapterNumber}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
                <ListItemText primary={`1/1/2001`} />
            }
            disablePadding
            className='chapter-item'
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.chapterId)} dense>
              <ListItemText id={labelId} primary={value.chapterName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}