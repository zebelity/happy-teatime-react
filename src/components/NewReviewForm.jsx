import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleContent}></textarea>
      <select value={score} onChange={handleScore}>
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
      <button>Add Review</button>
    </form>
  )
}