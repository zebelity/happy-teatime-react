import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NewReviewForm from "./NewReviewForm";
import Review from "./Review";
import "./MenuItemDetail.css"
import * as BubbleTeaApi from "../utils/bubble_tea_api"

export default function MenuItemDetail({ user }) {

  const {id} = useParams()

  const [menuItem, setMenuItem] = useState()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    setTimeout(() => {
      BubbleTeaApi.fetchMenuItem(id)
        .then(res => {
          setMenuItem(res.data)
          setReviews(res.data.reviews)
        })
    }, 1000)
  }, [])

  async function addReview(review) {
    try {
      const res = await BubbleTeaApi.createReview(id, review)
      const newReview = res.data;
      console.log({newReview})
      newReview.userId = user
      setReviews([ newReview, ...reviews ])
    } catch(error) {
      console.error("Error adding review:", error);
    }
  }
        

  async function deleteReview(id, reviewId){
    try {
      await BubbleTeaApi.deleteReview(id, reviewId);
      const updateReviews = reviews.filter(review => review._id !== reviewId);
      setReviews(updateReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  function updateReview(newReview){
    newReview.userId = user
    setReviews(reviews.map(review => 
    review._id === newReview._id ? newReview : review))
  }

  function calculateAverageRating(reviews) {
    const totalScore = reviews.reduce((total, review) => total + review.score, 0);
    const averageRating = reviews.length > 0 ? totalScore / reviews.length : 0;
    return averageRating.toFixed(2);
  }
  
  const totalScore = calculateAverageRating(reviews);

  return menuItem ? (
    <div className="menuItem-detail">
      <div className="top-content">
        <h2>{menuItem.title}</h2>
        <p>Total Score: {totalScore}</p>
      </div>
      <div className="pic-box">
        <img src={menuItem.img_url} alt={menuItem.title} />
      </div>
      <div className="detail-content">
        <h3>{menuItem.detail}</h3>
        <h4>Energy: {menuItem.calories} KJ</h4>
      </div>
      <div className="review-section">
        <h3>Reviews</h3>
        <NewReviewForm 
          onAdd={addReview}
          menuItemId={id}/>

        <ul className="review-container">
          {reviews.map((review) => 
          <Review 
          key={review._id}
          onDelete={deleteReview}
          onUpdate={updateReview}
          menuItemId={id}
          review={review}
          user={user}
          />
          )}
        </ul>
      </div>
    </div>
  ) : (<p>Loading....</p>)
}