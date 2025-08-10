import axios from "axios";

const API_URL = "http://localhost:5000/api/hero-sections";

export const createHeroSection = (formData, token) =>
  axios
    .post(API_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const updateHeroSection = (id, formData, token) =>
  axios
    .put(`${API_URL}/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

// ✅ New delete API
export const deleteHeroSection = (id, token) =>
  axios
    .delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
