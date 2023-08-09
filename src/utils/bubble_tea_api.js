import axios from "axios";
import { getToken } from "./users_service";

// const headers = axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export function fetchMenuItems() {
  return axios.get('/api/menuItems')
}

export function fetchMenuItem(id) {
  return axios.get(`/api/menuItems/${id}`)
}

export function createReview(id, review, score) {
  return   axios.post(`/api/menuItems/${id}/reviews`, review, score)
}

export function deleteReview(id, reviewId) {
  return axios.delete(`/api/menuItems/${id}/reviews/${reviewId}`)
} 

export function updateReview(review) {
  // console.log(review)
  // console.log(review._id)
  // console.log(review.content)
  const body = {content: review.content}

  return axios.put(`/api/menuItems/${review.menuItemId}/reviews/${review._id}`, body)
}