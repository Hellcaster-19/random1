const rideService = require('../services/rideService');

/**
 * Socket.io Event Handlers
 * Manages real-time communication between server and clients
 */

const setupSocketHandlers = (io) => {
  
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    /**
     * Join a ride room for real-time updates
     */
    socket.on('joinRideRoom', (rideId) => {
      socket.join(`ride:${rideId}`);
      console.log(`👥 Client ${socket.id} joined ride room: ${rideId}`);
    });

    /**
     * Leave a ride room
     */
    socket.on('leaveRideRoom', (rideId) => {
      socket.leave(`ride:${rideId}`);
      console.log(`👋 Client ${socket.id} left ride room: ${rideId}`);
    });

    /**
     * Handle real-time location updates from vehicle
     * This simulates GPS updates from the happiness car
     */
    socket.on('vehicleLocationUpdate', async (data) => {
      const { rideId, location } = data;

      try {
        const result = await rideService.updateVehicleLocation(rideId, location);

        if (result.success) {
          // Broadcast updated location and route to all clients in the ride room
          io.to(`ride:${rideId}`).emit('locationUpdated', {
            rideId,
            currentLocation: result.ride.currentLocation,
            route: result.ride.route,
            timestamp: new Date()
          });

          console.log(`📍 Location updated for ride ${rideId}`);
        }
      } catch (error) {
        console.error('Socket location update error:', error);
        socket.emit('error', {
          message: 'Failed to update location'
        });
      }
    });

    /**
     * Handle new user joining the ride
     * This broadcasts route updates to all connected clients
     */
    socket.on('userJoined', async (data) => {
      const { rideId } = data;

      try {
        const result = await rideService.getRideById(rideId);

        if (result.success) {
          // Broadcast route update to all clients
          io.to(`ride:${rideId}`).emit('routeUpdated', {
            rideId,
            route: result.ride.route,
            waypoints: result.ride.waypoints,
            timestamp: new Date()
          });

          console.log(`🎉 New user joined ride ${rideId}`);
        }
      } catch (error) {
        console.error('Socket user joined error:', error);
      }
    });

    /**
     * Handle ride completion
     */
    socket.on('rideCompleted', (data) => {
      const { rideId } = data;
      
      // Notify all clients in the ride room
      io.to(`ride:${rideId}`).emit('rideEnded', {
        rideId,
        message: 'Ride has been completed',
        timestamp: new Date()
      });

      console.log(`🏁 Ride ${rideId} completed`);
    });

    /**
     * Handle client disconnect
     */
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

  });

  return io;
};

module.exports = setupSocketHandlers;
