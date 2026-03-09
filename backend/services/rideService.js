const Ride = require('../models/Ride');
const mapboxService = require('./mapboxService');
const { isWithinProximity } = require('../utils/distance');

/**
 * Ride Service
 * Contains all business logic for ride management
 */
class RideService {
  
  /**
   * Create a new happiness ride
   */
  async createRide(rideData) {
    try {
      const ride = new Ride(rideData);
      await ride.save();
      
      return {
        success: true,
        ride
      };
    } catch (error) {
      console.error('Create ride error:', error);
      return {
        success: false,
        message: 'Failed to create ride',
        error: error.message
      };
    }
  }

  /**
   * Get all active rides
   */
  async getActiveRides() {
    try {
      const rides = await Ride.find({ status: 'active' });
      
      return {
        success: true,
        rides
      };
    } catch (error) {
      console.error('Get rides error:', error);
      return {
        success: false,
        message: 'Failed to fetch rides',
        error: error.message
      };
    }
  }

  /**
   * Get ride by ID
   */
  async getRideById(rideId) {
    try {
      const ride = await Ride.findById(rideId);
      
      if (!ride) {
        return {
          success: false,
          message: 'Ride not found'
        };
      }

      return {
        success: true,
        ride
      };
    } catch (error) {
      console.error('Get ride error:', error);
      return {
        success: false,
        message: 'Failed to fetch ride',
        error: error.message
      };
    }
  }

  /**
   * CRITICAL: Join ride with 5km proximity validation
   * This enforces the non-negotiable business rule
   */
  async joinRide(rideId, userLocation, userName) {
    try {
      const ride = await Ride.findById(rideId);
      
      if (!ride) {
        return {
          success: false,
          message: 'Ride not found'
        };
      }

      if (ride.status !== 'active') {
        return {
          success: false,
          message: 'Ride is not active'
        };
      }

      // CRITICAL: Validate 5km proximity
      const vehicleLocation = ride.currentLocation.coordinates;
      const maxDistance = parseFloat(process.env.MAX_JOIN_DISTANCE_KM) || 5;
      
      const proximityCheck = isWithinProximity(
        userLocation.latitude,
        userLocation.longitude,
        vehicleLocation[1], // latitude
        vehicleLocation[0], // longitude
        maxDistance
      );

      // Reject if user is too far
      if (!proximityCheck.isWithinRange) {
        return {
          success: false,
          message: `You are ${proximityCheck.distance}km away. Must be within ${maxDistance}km to join.`,
          distance: proximityCheck.distance,
          maxDistance
        };
      }

      // Add waypoint
      const newWaypoint = {
        location: {
          type: 'Point',
          coordinates: [userLocation.longitude, userLocation.latitude]
        },
        userName: userName || 'Anonymous User',
        joinedAt: new Date()
      };

      ride.waypoints.push(newWaypoint);

      // Recalculate route with new waypoint
      const routeResult = await mapboxService.calculateRouteWithWaypoints(
        ride.currentLocation,
        ride.waypoints,
        ride.destination
      );

      if (routeResult.success) {
        ride.route = routeResult.route;
      }

      await ride.save();

      return {
        success: true,
        message: 'Successfully joined the ride!',
        ride,
        distance: proximityCheck.distance
      };

    } catch (error) {
      console.error('Join ride error:', error);
      return {
        success: false,
        message: 'Failed to join ride',
        error: error.message
      };
    }
  }

  /**
   * Update vehicle location and recalculate route
   */
  async updateVehicleLocation(rideId, newLocation) {
    try {
      const ride = await Ride.findById(rideId);
      
      if (!ride) {
        return {
          success: false,
          message: 'Ride not found'
        };
      }

      // Update current location
      ride.currentLocation.coordinates = [newLocation.longitude, newLocation.latitude];

      // Recalculate route from new position
      if (ride.waypoints.length > 0 || ride.destination) {
        const routeResult = await mapboxService.calculateRouteWithWaypoints(
          ride.currentLocation,
          ride.waypoints,
          ride.destination
        );

        if (routeResult.success) {
          ride.route = routeResult.route;
        }
      }

      await ride.save();

      return {
        success: true,
        ride
      };

    } catch (error) {
      console.error('Update location error:', error);
      return {
        success: false,
        message: 'Failed to update location',
        error: error.message
      };
    }
  }

  /**
   * Complete a ride
   */
  async completeRide(rideId) {
    try {
      const ride = await Ride.findByIdAndUpdate(
        rideId,
        { status: 'completed' },
        { new: true }
      );

      return {
        success: true,
        ride
      };
    } catch (error) {
      console.error('Complete ride error:', error);
      return {
        success: false,
        message: 'Failed to complete ride',
        error: error.message
      };
    }
  }
}

module.exports = new RideService();
