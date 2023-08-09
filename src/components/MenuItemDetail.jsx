import { useEffect, useState } from "react";
import NewReviewForm from "./NewReviewForm";
import Review from "./Review";
import "./MenuItemDetail.css"
import * as BubbleTeaApi from "../utils/bubble_tea_api"
import { Route, Routes, Link, useParams } from 'react-router-dom';

export default function MenuItemDetail() {

  const {id} = useParams()
  console.log({id})

  const [menuItem, setMenuItem] = useState()
  const [reviews, setReviews] = useState([])
  // const { _id, detail } = menuItem;

  useEffect(() => {
    setTimeout(() => {
      BubbleTeaApi.fetchMenuItem(id)
        .then(res => {
          setMenuItem(res.data)
          setReviews(res.data.reviews)
        })
    }, 1000)
  }, [])

  function addReview(review) {
    BubbleTeaApi
      .createReview(id, review)
      .then(res => {
        setReviews([res.data, ...reviews])
        })
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
    //console.log(newReview)
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
      <h2>{menuItem.title}</h2>
      <img src={menuItem.img_url} alt={menuItem.title} />
      <p>Detail: {menuItem.detail}</p>
      <p>Total Score: {totalScore}</p>
      <h3>Reviews</h3>
      <NewReviewForm 
        onAdd={addReview}
        menuItemId={id}/>
      {/* Add a component for displaying reviews */}
      {/* Add a form for adding a new review */}

      <ul className="review-container">
        {reviews.map((review) => 
        <Review 
        key={review._id}
        onDelete={deleteReview}
        onUpdate={updateReview}
        menuItemId={id}
        review={review}
        />
        )}
      </ul>

    </div>
  ) : (<p>Loading....</p>)
}