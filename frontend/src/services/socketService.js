import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Socket Service
 * Manages WebSocket connection and events
 */
class SocketService {
  constructor() {
    this.socket = null;
  }

  /**
   * Connect to Socket.io server
   */
  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }

    return this.socket;
  }

  /**
   * Disconnect from server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Join a ride room for real-time updates
   */
  joinRideRoom(rideId) {
    if (this.socket) {
      this.socket.emit('joinRideRoom', rideId);
      console.log('👥 Joined ride room:', rideId);
    }
  }

  /**
   * Leave a ride room
   */
  leaveRideRoom(rideId) {
    if (this.socket) {
      this.socket.emit('leaveRideRoom', rideId);
      console.log('👋 Left ride room:', rideId);
    }
  }

  /**
   * Send vehicle location update
   */
  sendLocationUpdate(rideId, location) {
    if (this.socket) {
      this.socket.emit('vehicleLocationUpdate', { rideId, location });
    }
  }

  /**
   * Notify that a user has joined
   */
  notifyUserJoined(rideId) {
    if (this.socket) {
      this.socket.emit('userJoined', { rideId });
    }
  }

  /**
   * Listen for location updates
   */
  onLocationUpdate(callback) {
    if (this.socket) {
      this.socket.on('locationUpdated', callback);
    }
  }

  /**
   * Listen for route updates
   */
  onRouteUpdate(callback) {
    if (this.socket) {
      this.socket.on('routeUpdated', callback);
    }
  }

  /**
   * Listen for ride completion
   */
  onRideEnded(callback) {
    if (this.socket) {
      this.socket.on('rideEnded', callback);
    }
  }

  /**
   * Listen to an event generically
   */
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Emit an event generically
   */
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  /**
   * Remove event listener
   */
  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  /**
   * Get socket instance
   */
  getSocket() {
    return this.socket;
  }
}

export default new SocketService();
