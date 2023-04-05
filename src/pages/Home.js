import React, { useEffect } from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()
  
  
  return (
    <div>
      <h1>Đây là trang chủ!</h1>
    </div>
  )
}

export default Home
