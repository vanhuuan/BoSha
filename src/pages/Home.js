import React, { useEffect } from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";
import EditorImage from '../components/editor/editor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BorderAll } from '@mui/icons-material';


const Home = () => {
  let navigate = useNavigate()
  
  
  return (
    <>
    <EditorImage sx={{margin: 100, border:'1px solid black'}}/>
    </>
    
  )
}

export default Home
