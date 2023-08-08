import axios from "axios";

export function fetchMenuItems() {
  return axios.get('/api/menuItems')
}

export function createReview(id, review, score) {
  return   axios.post(`/api/menuItems/${id}/reviews`, review, score)
}

export function deleteReview(id, reviewId) {
  return axios.delete(`/api/menuItems/${id}/reviews/${reviewId}`)
} 