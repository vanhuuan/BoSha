import React, { useState, useEffect } from 'react';
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import '../../css/SelectMulti.css';
import { userBookService } from '../../services/userBook.service';

export default function BookCategories(props) {
  const [category, setcategory] = React.useState(props.categories)
  const [categories, setCategories] = React.useState([])

  useEffect( async () => {
    const rs = await userBookService.categories();
    console.log(rs)
    if(rs){
      setCategories(rs.data)
    }
  }, []);

  return (
    <div> 
      <div className="category-item-list">
        {category.map((item) => {
          var cateName = ""
          if(categories.find((cate) => cate.id == item)){
            cateName = categories.find((cate) => cate.id == item).name
          }
          return <span className="category-item">{cateName}</span>;
        })}
      </div>
    </div>
  );
}