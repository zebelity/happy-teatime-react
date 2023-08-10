import { useState } from "react";
import './NewReviewForm.css'

export default function NewReviewForm({ onAdd, menuItemId }) {

  const [content, setContent] = useState("");
  const [score, setScore] = useState(10)

  function handleContent(e) {
    setContent(e.target.value)
  }

  function handleScore(e) {
    setScore(Number(e.target.value))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({ content, score, menuItemId })
    setContent("")
  }

  return (
    <form className="new-review-form" onSubmit={handleSubmit}>
      <textarea 
        className="review-content-input" 
        value={content} 
        onChange={handleContent}>
      </textarea>
      <div className="score-container">
        <label htmlFor="score">Score : </label>
        <select className="score-select" value={score} onChange={handleScore}>
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>  
      <button className="add-review-btn">Add Review</button>
    </form>
  )
}