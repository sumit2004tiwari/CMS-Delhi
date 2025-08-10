// api/admin.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change if deployed

// Login admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
