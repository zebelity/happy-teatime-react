import { useEffect, useState } from "react"
import MenuItem from "../components/MenuItem"
import "./Homepage.css"
import * as BubbleTeaApi from "../utils/bubble_tea_api"

export default function Homepage() {

  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    BubbleTeaApi.fetchMenuItems()
      .then(res => setMenuItems(res.data))
  }, [])

  return (
  <>
    <h2>All Bubble Tea</h2>
    <section className="menuItems-section">
    {menuItems.map((menuItem) => 
      <MenuItem 
        key={menuItem._id}
        menuItem={menuItem}/>
    )}
    </section>
  </>
  )
}