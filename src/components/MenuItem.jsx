
import { useState } from "react";
import * as BubbleTeaApi from "../utils/bubble_tea_api"
import "./MenuItem.css"
import MenuItemDetail from "./MenuItemDetail";

export default function MenuItem({ menuItem }) {

  const { title, brand, img_url } = menuItem;

  const [showDetail, setShowDetail] = useState(false);
  //const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);

  const handleItemClick = () => {
    setShowDetail(!showDetail);
  };
  
  return (
    <div className="menuItem-wrapper">
      <div className="content">
        <div className="top">
          <h3>Brand: {brand.name}</h3>
          <p>Score</p>
          {/* <p>Total Score: {totalScore}</p> */}
        </div>
        <div className="pic-box">
          <img onClick={handleItemClick} src={img_url} alt={title} />
        </div>
        
        <h3>{title}</h3>
      </div>
      {showDetail && <MenuItemDetail menuItem={menuItem} />}
    </div>
  )
}