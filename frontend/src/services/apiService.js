import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * API Service
 * Handles all HTTP requests to the backend
 */

// Helper to get auth header
const getAuthHeaders = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const apiService = {

  /**
   * Register user
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  /**
   * Login user
   */
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, userData);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Create a new ride (Active right away)
   */
  createRide: async (rideData) => {
    try {
      const response = await axios.post(`${API_URL}/api/rides`, rideData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Create ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Schedule a new ride
   */
  scheduleRide: async (rideData) => {
    try {
      const response = await axios.post(`${API_URL}/api/rides/schedule`, rideData, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Schedule ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get all scheduled rides
   */
  getScheduledRides: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rides/scheduled`);
      return response.data;
    } catch (error) {
      console.error('Get scheduled rides error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get nearby rides
   */
  getNearbyRides: async (lat, lng, radius = 10) => {
    try {
      const response = await axios.get(`${API_URL}/api/rides/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      return response.data;
    } catch (error) {
      console.error('Get nearby rides error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get all active rides
   */
  getActiveRides: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rides`);
      return response.data;
    } catch (error) {
      console.error('Get rides error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get ride by ID
   */
  getRideById: async (rideId) => {
    try {
      const response = await axios.get(`${API_URL}/api/rides/${rideId}`);
      return response.data;
    } catch (error) {
      console.error('Get ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Join a ride (with proximity validation)
   */
  joinRide: async (rideId, userLocation, userName) => {
    try {
      const response = await axios.post(`${API_URL}/api/rides/${rideId}/join`, {
        userLocation,
        userName
      }, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Join ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update vehicle location
   */
  updateVehicleLocation: async (rideId, location) => {
    try {
      const response = await axios.put(`${API_URL}/api/rides/${rideId}/location`, {
        location
      }, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Update location error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Complete a ride
   */
  completeRide: async (rideId) => {
    try {
      const response = await axios.put(`${API_URL}/api/rides/${rideId}/complete`, {}, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Delete a ride (Admin only)
   */
  deleteRide: async (rideId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/rides/${rideId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Delete ride error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Rate a ride
   */
  rateRide: async (rideId, rating, comment) => {
    try {
      const response = await axios.post(`${API_URL}/api/rides/${rideId}/rate`, {
        rating,
        comment
      }, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Rate ride error:', error);
      throw error.response?.data || error;
    }
  }
};

export default apiService;
