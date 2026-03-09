import React, { useState, useEffect, useCallback } from 'react';
import MapView from './components/MapView';
import RideInfo from './components/RideInfo';
import apiService from './services/apiService';
import socketService from './services/socketService';
import { getCurrentLocation, calculateDistance } from './utils/geolocation';
import './App.css';

/**
 * Main App Component
 * Orchestrates the entire application
 */
function App() {
  const [ride, setRide] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [distanceToVehicle, setDistanceToVehicle] = useState(null);
  const [notification, setNotification] = useState(null);
  const [userName, setUserName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);

  // Fetch active rides on mount
  useEffect(() => {
    fetchActiveRides();
    getUserLocation();
  }, []);

  // Setup socket connection
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Join ride room when ride is loaded
  useEffect(() => {
    if (ride) {
      socketService.joinRideRoom(ride._id);

      // Listen for location updates
      socketService.onLocationUpdate(handleLocationUpdate);

      // Listen for route updates
      socketService.onRouteUpdate(handleRouteUpdate);

      // Listen for ride end
      socketService.onRideEnded(handleRideEnded);

      return () => {
        socketService.leaveRideRoom(ride._id);
        socketService.off('locationUpdated');
        socketService.off('routeUpdated');
        socketService.off('rideEnded');
      };
    }
  }, [ride]);

  // Calculate distance when user location or ride location changes
  useEffect(() => {
    if (userLocation && ride && ride.currentLocation) {
      const [vLng, vLat] = ride.currentLocation.coordinates;
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        vLat,
        vLng
      );
      setDistanceToVehicle(distance);
    }
  }, [userLocation, ride?.currentLocation]);

  /**
   * Fetch active rides from API
   */
  const fetchActiveRides = async () => {
    try {
      const result = await apiService.getActiveRides();
      if (result.success && result.rides.length > 0) {
        setRide(result.rides[0]); // Use first active ride
      }
    } catch (error) {
      console.error('Failed to fetch rides:', error);
      showNotification('Failed to load rides', 'error');
    }
  };

  /**
   * Get user's current location
   */
  const getUserLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      console.log('📍 User location obtained:', location);
    } catch (error) {
      console.error('Location error:', error);
      showNotification(error.message, 'error');
    }
  };

  /**
   * Handle location updates from socket
   */
  const handleLocationUpdate = useCallback((data) => {
    console.log('📍 Location update received:', data);
    setRide(prevRide => ({
      ...prevRide,
      currentLocation: data.currentLocation,
      route: data.route
    }));
  }, []);

  /**
   * Handle route updates from socket
   */
  const handleRouteUpdate = useCallback((data) => {
    console.log('🛣️ Route update received:', data);
    setRide(prevRide => ({
      ...prevRide,
      route: data.route,
      waypoints: data.waypoints
    }));
  }, []);

  /**
   * Handle ride ended event
   */
  const handleRideEnded = useCallback((data) => {
    console.log('🏁 Ride ended:', data);
    showNotification('Ride has been completed', 'info');
    setRide(prevRide => ({
      ...prevRide,
      status: 'completed'
    }));
  }, []);

  /**
   * Handle join ride request
   */
  const handleJoinRide = async () => {
    if (!userName.trim()) {
      setShowNameModal(true);
      return;
    }

    setIsJoining(true);

    try {
      const result = await apiService.joinRide(
        ride._id,
        userLocation,
        userName
      );

      if (result.success) {
        showNotification('Successfully joined the ride! 🎉', 'success');
        setRide(result.ride);
        
        // Notify other users via socket
        socketService.notifyUserJoined(ride._id);
      } else {
        showNotification(result.message, 'error');
      }
    } catch (error) {
      console.error('Join ride error:', error);
      showNotification(error.message || 'Failed to join ride', 'error');
    } finally {
      setIsJoining(false);
    }
  };

  /**
   * Submit name and join ride
   */
  const submitNameAndJoin = () => {
    if (userName.trim()) {
      setShowNameModal(false);
      handleJoinRide();
    }
  };

  /**
   * Show notification
   */
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎉 Happiness Campaign</h1>
        <p>Track and join the happiness ride in real-time</p>
      </header>

      <div className="app-content">
        <div className="map-section">
          <MapView ride={ride} userLocation={userLocation} />
        </div>

        <div className="info-section">
          <RideInfo
            ride={ride}
            userLocation={userLocation}
            onJoinRide={handleJoinRide}
            isJoining={isJoining}
            distanceToVehicle={distanceToVehicle}
          />
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Name Modal */}
      {showNameModal && (
        <div className="modal-overlay" onClick={() => setShowNameModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Your Name</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              onKeyPress={(e) => e.key === 'Enter' && submitNameAndJoin()}
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={() => setShowNameModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={submitNameAndJoin} className="submit-btn">
                Join Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
