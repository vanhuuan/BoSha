import React, { useState, useEffect } from 'react';
import '../../css/SelectMulti.css';
import { userBookService } from '../../services/userBook.services';

export default function BookCategories(props) {
  const [category, setcategory] = React.useState(props.categories)
  const [categories, setCategories] = React.useState([])

  useEffect(() => {
    const load = async () => {
      const rs = await userBookService.categories();
      console.log(rs)
      if(rs){
        setCategories(rs.data)
      }
    }
    load()
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