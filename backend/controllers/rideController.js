const rideService = require('../services/rideService');

/**
 * Ride Controller
 * Handles HTTP requests and responses
 */

/**
 * Create a new ride
 */
const createRide = async (req, res) => {
  try {
    const result = await rideService.createRide(req.body);
    
    if (result.success) {
      return res.status(201).json(result);
    }
    
    return res.status(400).json(result);
  } catch (error) {
    console.error('Create ride controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get all active rides
 */
const getActiveRides = async (req, res) => {
  try {
    const result = await rideService.getActiveRides();
    
    if (result.success) {
      return res.status(200).json(result);
    }
    
    return res.status(400).json(result);
  } catch (error) {
    console.error('Get rides controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get ride by ID
 */
const getRideById = async (req, res) => {
  try {
    const result = await rideService.getRideById(req.params.id);
    
    if (result.success) {
      return res.status(200).json(result);
    }
    
    return res.status(404).json(result);
  } catch (error) {
    console.error('Get ride controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Join a ride (with 5km validation)
 */
const joinRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { userLocation, userName } = req.body;

    // Validate input
    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      return res.status(400).json({
        success: false,
        message: 'User location is required'
      });
    }

    const result = await rideService.joinRide(rideId, userLocation, userName);
    
    if (result.success) {
      return res.status(200).json(result);
    }
    
    // Return 403 for proximity violations
    if (result.distance && result.maxDistance) {
      return res.status(403).json(result);
    }
    
    return res.status(400).json(result);
  } catch (error) {
    console.error('Join ride controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update vehicle location
 */
const updateLocation = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { location } = req.body;

    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({
        success: false,
        message: 'Location is required'
      });
    }

    const result = await rideService.updateVehicleLocation(rideId, location);
    
    if (result.success) {
      return res.status(200).json(result);
    }
    
    return res.status(400).json(result);
  } catch (error) {
    console.error('Update location controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Complete a ride
 */
const completeRide = async (req, res) => {
  try {
    const result = await rideService.completeRide(req.params.id);
    
    if (result.success) {
      return res.status(200).json(result);
    }
    
    return res.status(400).json(result);
  } catch (error) {
    console.error('Complete ride controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createRide,
  getActiveRides,
  getRideById,
  joinRide,
  updateLocation,
  completeRide
};
