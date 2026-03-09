import React from 'react';
import './RideInfo.css';
import { formatDistance } from '../utils/geolocation';

/**
 * RideInfo Component
 * Displays ride details and join functionality
 */
const RideInfo = ({ 
  ride, 
  userLocation, 
  onJoinRide, 
  isJoining,
  distanceToVehicle 
}) => {
  
  if (!ride) {
    return (
      <div className="ride-info">
        <div className="no-ride">
          <h3>No Active Ride</h3>
          <p>Waiting for the happiness ride to start...</p>
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    if (!userLocation) {
      alert('Please enable location access to join the ride');
      return;
    }
    onJoinRide();
  };

  return (
    <div className="ride-info">
      <div className="ride-header">
        <h2>🎉 {ride.rideName}</h2>
        <span className={`status-badge ${ride.status}`}>
          {ride.status.toUpperCase()}
        </span>
      </div>

      <div className="ride-details">
        <div className="detail-item">
          <span className="label">Current Location:</span>
          <span className="value">
            {ride.currentLocation.coordinates[1].toFixed(4)}°N, {ride.currentLocation.coordinates[0].toFixed(4)}°E
          </span>
        </div>

        {distanceToVehicle !== null && (
          <div className="detail-item">
            <span className="label">Distance from You:</span>
            <span className={`value distance ${distanceToVehicle <= 5 ? 'near' : 'far'}`}>
              {formatDistance(distanceToVehicle)}
              {distanceToVehicle <= 5 ? ' ✅' : ' ⚠️'}
            </span>
          </div>
        )}

        <div className="detail-item">
          <span className="label">Participants:</span>
          <span className="value">{ride.waypoints ? ride.waypoints.length : 0} people</span>
        </div>

        <div className="detail-item">
          <span className="label">Speed:</span>
          <span className="value">{ride.speed} km/h</span>
        </div>
      </div>

      {ride.waypoints && ride.waypoints.length > 0 && (
        <div className="waypoints-list">
          <h4>🌟 Participants</h4>
          <ul>
            {ride.waypoints.map((waypoint, index) => (
              <li key={index}>
                <strong>{waypoint.userName}</strong>
                <span className="join-time">
                  {new Date(waypoint.joinedAt).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="action-section">
        <button 
          className="join-button"
          onClick={handleJoin}
          disabled={isJoining || !userLocation || ride.status !== 'active'}
        >
          {isJoining ? 'Joining...' : '✨ Join This Ride'}
        </button>

        {!userLocation && (
          <p className="warning-text">
            📍 Location access required to join
          </p>
        )}

        {distanceToVehicle > 5 && (
          <p className="warning-text">
            ⚠️ You must be within 5km of the vehicle to join
          </p>
        )}
      </div>
    </div>
  );
};

export default RideInfo;
