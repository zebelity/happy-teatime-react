
import { useState, useEffect } from "react";
import "./MenuItem.css"
import MenuItemDetail from "./MenuItemDetail";

export default function MenuItem({ menuItem }) {

  const { title, brand, img_url } = menuItem;
  const [showDetail, setShowDetail] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Load like count from local storage for this menu item
    const storedLikes = localStorage.getItem(`menuItemLikes:${menuItem._id}`);
    if (storedLikes) {
      setLikes(Number(storedLikes));
    }
  }, [menuItem._id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`menuItemLikes:${menuItem._id}`, newLikes.toString());
  };

  const handleItemClick = () => {
    const token = localStorage.getItem("token")
    token ? window.location = `/menuItems/${menuItem._id}` :
    window.location = `/login`
  };

  return (
    <div className="menuItem-wrapper">
      <div className="content" onClick={handleItemClick}>
        <h3>{title}</h3>
        <div className="pic-box1">
          <img  src={img_url} alt={title} />
        </div>
      </div>
      <footer>
        <h4>{brand.name}</h4>
        <button className="like-btn" onClick={handleLike}>{likes} Liked</button>
      </footer>
      <div className="body-detail" >
        {showDetail && <MenuItemDetail menuItem={menuItem} />}
      </div>
    </div>
  )
}