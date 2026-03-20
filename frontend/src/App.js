import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import MapView from './components/MapView';
import RideInfo from './components/RideInfo';
import ScheduleRideForm from './components/ScheduleRideForm';
import NearbyRides from './components/NearbyRides';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LiveMapPage from './pages/LiveMapPage';
import AboutPage from './pages/AboutPage';
import CampaignsPage from './pages/CampaignsPage';
import { useAuth } from './context/AuthContext';
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
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempUserName, setTempUserName] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [scheduledRides, setScheduledRides] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // Fetch active rides on mount
  useEffect(() => {
    fetchActiveRides();
    fetchScheduledRides();
    getUserLocation();
  }, []);

  // Setup socket connection
  useEffect(() => {
    socketService.connect();

    // Listen for new scheduled rides
    socketService.on('rideScheduled', () => {
      fetchScheduledRides();
    });

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
    if (userLocation && ride && ride.location) {
      const [vLng, vLat] = ride.location.coordinates;
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        vLat,
        vLng
      );
      setDistanceToVehicle(distance);
    }
  }, [userLocation, ride?.location]);

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
      showNotification('Failed to load active rides', 'error');
    }
  };

  /**
   * Fetch scheduled rides from API
   */
  const fetchScheduledRides = async () => {
    try {
      const result = await apiService.getScheduledRides();
      if (result.success) {
        setScheduledRides(result.rides || []);
      }
    } catch (error) {
      console.error('Failed to fetch scheduled rides:', error);
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
      location: data.location,
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
    if (!user) {
      showNotification('Please login to join a ride', 'info');
      navigate('/');
      return;
    }

    setIsJoining(true);

    try {
      const result = await apiService.joinRide(
        ride._id,
        userLocation,
        user.name
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
   * Show notification
   */
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showNotification('Logged out successfully', 'success');
  };

  const isAdmin = user && user.role === 'admin';

  const handleDeleteRide = async (rideId) => {
    if (!window.confirm('Are you sure you want to delete this ride?')) return;
    try {
      const result = await apiService.deleteRide(rideId);
      if (result.success) {
        showNotification('Ride deleted successfully', 'success');
        fetchScheduledRides();
        fetchActiveRides();
      }
    } catch (error) {
      showNotification(error.message || 'Failed to delete ride', 'error');
    }
  };

  const handleRateRide = async (rideId, rating, comment) => {
    try {
      const result = await apiService.rateRide(rideId, rating, comment);
      if (result.success) {
        showNotification(`Rated ${result.averageRating}⭐ - Thank you!`, 'success');
        setRide(result.ride);
      }
    } catch (error) {
      showNotification(error.message || 'Failed to rate ride', 'error');
    }
  };

  // Main Home component
  const Home = () => (
    <div className="app-content">
      <div className="map-section">
        <MapView ride={ride} userLocation={userLocation} scheduledRides={scheduledRides} />
      </div>

      <div className="info-section">
        {showScheduleForm ? (
          <ScheduleRideForm
            onCancel={() => setShowScheduleForm(false)}
            onScheduleSuccess={(newRide) => {
              setShowScheduleForm(false);
              showNotification('Ride scheduled successfully!', 'success');
              fetchScheduledRides();
              socketService.emit('rideScheduled', newRide);
            }}
          />
        ) : (
          <>
            <RideInfo
              ride={ride}
              userLocation={userLocation}
              onJoinRide={handleJoinRide}
              isJoining={isJoining}
              distanceToVehicle={distanceToVehicle}
              isAdmin={isAdmin}
              user={user}
              onDeleteRide={handleDeleteRide}
              onRateRide={handleRateRide}
            />
            {isAdmin && (
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <button
                  className="submit-btn full-width"
                  onClick={() => setShowScheduleForm(true)}
                >
                  📅 Schedule a New Ride
                </button>
              </div>
            )}
            <NearbyRides userLocation={userLocation} onRideSelect={setRide} isAdmin={isAdmin} onDeleteRide={handleDeleteRide} />

            {/* Scheduled Rides List - Admin can delete */}
            {scheduledRides.length > 0 && (
              <div className="scheduled-rides-panel">
                <h3>📅 Scheduled Rides</h3>
                <div className="scheduled-rides-list">
                  {scheduledRides.map(sr => (
                    <div key={sr._id} className="scheduled-ride-item">
                      <div className="sr-info">
                        <span className="sr-title">{sr.title || sr.rideName}</span>
                        <span className="sr-time">{sr.scheduledStartTime ? new Date(sr.scheduledStartTime).toLocaleString() : 'TBD'}</span>
                      </div>
                      {isAdmin && (
                        <button className="sr-delete-btn" onClick={() => handleDeleteRide(sr._id)}>🗑️</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="app">


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/home" replace /> : <AuthPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" replace />} />
        <Route path="/tracker" element={user ? <LiveMapPage /> : <Navigate to="/auth" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/register" element={<Navigate to="/auth" replace />} />
      </Routes>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
