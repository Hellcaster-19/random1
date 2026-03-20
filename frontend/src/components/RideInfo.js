import React, { useState } from 'react';
import './RideInfo.css';
import { formatDistance } from '../utils/geolocation';

/**
 * RideInfo Component
 * Displays ride details, join functionality, admin controls, and user ratings
 */
const RideInfo = ({
  ride,
  userLocation,
  onJoinRide,
  isJoining,
  distanceToVehicle,
  isAdmin,
  user,
  onDeleteRide,
  onRateRide
}) => {

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);

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

  const handleSubmitRating = () => {
    if (selectedRating === 0) return;
    onRateRide(ride._id, selectedRating, ratingComment);
    setShowRatingForm(false);
    setSelectedRating(0);
    setRatingComment('');
  };

  // Calculate average rating
  const avgRating = ride.ratings && ride.ratings.length > 0
    ? (ride.ratings.reduce((sum, r) => sum + r.rating, 0) / ride.ratings.length).toFixed(1)
    : null;

  return (
    <div className="ride-info">
      <div className="ride-header">
        <h2>🎉 {ride.rideName || ride.title}</h2>
        <span className={`status-badge ${ride.status}`}>
          {ride.status.toUpperCase()}
        </span>
      </div>

      <div className="ride-details">
        <div className="detail-item">
          <span className="label">Current Location:</span>
          <span className="value">
            {ride.location.coordinates[1].toFixed(4)}°N, {ride.location.coordinates[0].toFixed(4)}°E
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

        {avgRating && (
          <div className="detail-item">
            <span className="label">Rating:</span>
            <span className="value rating-display">
              {'⭐'.repeat(Math.round(parseFloat(avgRating)))} {avgRating}/5
              <span className="rating-count">({ride.ratings.length})</span>
            </span>
          </div>
        )}
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
        {/* Join button for all users */}
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

      {/* Admin: Delete Ride */}
      {isAdmin && (
        <div className="admin-actions">
          <button
            className="delete-btn"
            onClick={() => onDeleteRide(ride._id)}
          >
            🗑️ Delete This Ride
          </button>
        </div>
      )}

      {/* User: Rate Ride */}
      {user && !isAdmin && (
        <div className="rating-section">
          {!showRatingForm ? (
            <button
              className="rate-btn"
              onClick={() => setShowRatingForm(true)}
            >
              ⭐ Rate This Ride
            </button>
          ) : (
            <div className="rating-form">
              <h4>Rate this ride</h4>
              <div className="star-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (hoverRating || selectedRating) ? 'active' : ''}`}
                    onClick={() => setSelectedRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className="rating-comment"
                placeholder="Leave a comment (optional)"
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                rows={2}
              />
              <div className="rating-actions">
                <button className="cancel-btn" onClick={() => setShowRatingForm(false)}>Cancel</button>
                <button
                  className="submit-btn"
                  onClick={handleSubmitRating}
                  disabled={selectedRating === 0}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RideInfo;
