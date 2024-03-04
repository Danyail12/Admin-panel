// api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminAPI = {
  // User-related API functions
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/admin/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Expert-related API functions
  getAllExperts: async () => {
    try {
      const response = await api.get('/getExperts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteExpert: async (expertId) => {
    try {
      const response = await api.delete(`/admin/expert/${expertId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateExpert: async (expertId, updatedData) => {
    try {
      const response = await api.put(`/admin/expert/${expertId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createExpert: async (newExpertData) => {
    try {
      const response = await api.post('/createExpert', newExpertData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingSessionsForExpert: async (expertId) => {
    try {
      const response = await api.get(`/admin/expert/${expertId}/booking-sessions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
