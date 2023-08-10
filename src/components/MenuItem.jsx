
import { useState } from "react";
import "./MenuItem.css"
import MenuItemDetail from "./MenuItemDetail";

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
      <div className="content" onClick={handleItemClick}>
        <h3>{title}</h3>
        <div className="pic-box">
          <img  src={img_url} alt={title} />
        </div>
      </div>
      <footer>
        <h4>{brand.name}</h4>
        <h4>Lover</h4>
      </footer>
      <div className="body-detail" >
        {showDetail && <MenuItemDetail menuItem={menuItem} />}
      </div>
    </div>
  )
}