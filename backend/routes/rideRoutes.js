const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

/**
 * Ride Routes
 */

// Create a new ride
router.post('/', rideController.createRide);

// Get all active rides
router.get('/', rideController.getActiveRides);

// Get ride by ID
router.get('/:id', rideController.getRideById);

// Join a ride (with proximity validation)
router.post('/:rideId/join', rideController.joinRide);

// Update vehicle location
router.put('/:rideId/location', rideController.updateLocation);

// Complete a ride
router.put('/:id/complete', rideController.completeRide);

module.exports = router;
