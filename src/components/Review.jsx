import { useState } from "react"
import * as BubbleTeaApi from "../utils/bubble_tea_api"
import './Review.css'

export default function Review({ menuItemId, review, onDelete, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(review.content)

  function handleEdit() {
    setIsEditing(true)
  }

  function handleCancel() {
    setIsEditing(false)
  }

  function handleContent(e) {
    setContent(e.target.value)
  }

  function handleSave(e) {
    BubbleTeaApi.updateReview({_id: review._id, content, score: review.score})
      .then(res => {
        
        const newReview = res.data;
        console.log(newReview)
        onUpdate(newReview)
        setIsEditing(false)
      })
  }



  const editSection = (
    <section>
      <textarea onChange={handleContent} onDoubleClick={handleCancel} value={content}></textarea>
      <button onClick={handleSave} className="save-btn" >Save</button>
    </section>
  )

  const contentSection = (
    <section onDoubleClick={handleEdit} >{review.content}</section>
  )

  return (
    <li className="review-item">
      <article className="review-content">
        {isEditing ? editSection : contentSection}
      </article>
      <p className="review-score">Score:{review.score}</p>
      <button className="delete-btn" onClick={() => onDelete(menuItemId, review._id)} >␡</button>
    </li>
  )
}