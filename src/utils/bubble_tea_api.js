import axios from "axios";
import { getToken } from "./users_service";

const headers = axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export function fetchMenuItems() {
  return axios.get('/api/menuItems', headers)
}

export function fetchMenuItem(id) {
  return axios.get(`/api/menuItems/${id}`, headers)
}

export function createReview(id, review, score) {
  return   axios.post(`/api/menuItems/${id}/reviews`, review, score, headers)
}

export function deleteReview(id, reviewId) {
  return axios.delete(`/api/menuItems/${id}/reviews/${reviewId}`, headers)
} 

export function updateReview(review) {

  const body = {content: review.content}

  return axios.put(`/api/menuItems/${review.menuItemId}/reviews/${review._id}`, body, headers)
}