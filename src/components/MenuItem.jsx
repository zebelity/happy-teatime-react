
import { useState } from "react";
import * as BubbleTeaApi from "../utils/bubble_tea_api"
import "./MenuItem.css"
import MenuItemDetail from "./MenuItemDetail";
import { Route, Routes, Link, useParams } from 'react-router-dom';

export default function MenuItem({ menuItem }) {

  const { title, brand, img_url } = menuItem;

  const [showDetail, setShowDetail] = useState(false);


  const handleItemClick = () => {
    const token = localStorage.getItem("token")
    token ? window.location = `/menuItems/${menuItem._id}` :
    window.location = `/login`
  };
  
  return (
    <div className="menuItem-wrapper">
      <div className="content">
        <div className="top">
          <h3>Brand: {brand.name}</h3>

        </div>
        <div className="pic-box">
          <img onClick={handleItemClick} src={img_url} alt={title} />
        </div>
        
        <h3>{title}</h3>
      </div>
      <div className="body-detail" >
        {showDetail && <MenuItemDetail menuItem={menuItem} />}
      </div>
    </div>
  )
}