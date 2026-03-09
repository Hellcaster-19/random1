import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * API Service
 * Handles all HTTP requests to the backend
 */

const apiService = {
  
  /**
   * Create a new ride
   */
  createRide: async (rideData) => {
    try {
      const response = await axios.post(`${API_URL}/api/rides`, rideData);
      return response.data;
    } catch (error) {
      console.error('Create ride error:', error);
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
      const response = await axios.put(`${API_URL}/api/rides/${rideId}/complete`);
      return response.data;
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error.response?.data || error;
    }
  }
};

export default apiService;
