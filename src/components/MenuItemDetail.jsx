import { useState } from "react";
import NewReviewForm from "./NewReviewForm";
import * as BubbleTeaApi from "../utils/bubble_tea_api"

export default function MenuItemDetail({ menuItem }) {

  const { _id, detail } = menuItem;
  const [reviews, setReviews] = useState(menuItem.reviews)

  // const totalScore = scores.reduce((sum, score) => sum + score, 0);

  function addReview(newReview) {
    BubbleTeaApi
      .createReview(_id, newReview)
      .then(res => {
        setReviews([res.data, ...reviews])
        })
  }

  function deleteReview(_id, reviewId){
    // console.log(reviewId)
    BubbleTeaApi.deleteReview(_id, reviewId)
      .then( () => {
        const updateReviews = reviews.filter(review => 
          review._id !== reviewId)
        setReviews(updateReviews);
    })
  }

  return (
    <div className="menuItem-detail">
      <p>Detail: {detail}</p>

      <h3>Reviews</h3>
      <NewReviewForm 
        onAdd={addReview}
        menuItemId={_id}/>
      {/* Add a component for displaying reviews */}
      {/* Add a form for adding a new review */}

      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.content}</p>
            <p>Score:{review.score}</p>
            <button onClick={() => deleteReview(_id, review._id)} >Del</button>
          </li>
        ))}
      </ul>

    </div>
  )
}