import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { formatDistance } from '../utils/geolocation';
import './NearbyRides.css';

const NearbyRides = ({ userLocation, onRideSelect, isAdmin, onDeleteRide }) => {
    const [nearbyRides, setNearbyRides] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userLocation) {
            fetchNearbyRides();
        }
    }, [userLocation]);

    const fetchNearbyRides = async () => {
        try {
            setIsLoading(true);
            setError('');

            const result = await apiService.getNearbyRides(
                userLocation.latitude,
                userLocation.longitude,
                10 // 10km radius
            );

            if (result.success) {
                setNearbyRides(result.rides || []);
            } else {
                setError('Failed to fetch nearby rides');
            }
        } catch (err) {
            setError('Could not connect to server to find rides');
        } finally {
            setIsLoading(false);
        }
    };

    if (!userLocation) {
        return (
            <div className="nearby-rides-container">
                <p className="warning-text">📍 Allow location access to see nearby rides.</p>
            </div>
        );
    }

    return (
        <div className="nearby-rides-container">
            <h3>🌍 Rides Near You (10km)</h3>

            {isLoading && <div className="loading-spinner">Searching...</div>}
            {error && <div className="error-text">{error}</div>}

            {!isLoading && !error && nearbyRides.length === 0 && (
                <p className="no-rides">No rides found within 10km.</p>
            )}

            <div className="nearby-rides-list">
                {nearbyRides.map(ride => {
                    return (
                        <div key={ride._id} className="nearby-ride-card">
                            <div className="nearby-ride-card-content" onClick={() => onRideSelect(ride)}>
                                <div className="nearby-ride-header">
                                    <h4>{ride.title || ride.rideName}</h4>
                                    <span className={`status-badge ${ride.status}`}>
                                        {ride.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="nearby-ride-details">
                                    <span>🚘 {ride.vehicleName || 'Happiness Bus'}</span>
                                    <span>👥 {ride.waypoints ? ride.waypoints.length : 0} / {ride.maxPassengers || 10}</span>
                                    {ride.status === 'scheduled' && ride.scheduledStartTime && (
                                        <span>🕒 {new Date(ride.scheduledStartTime).toLocaleTimeString()}</span>
                                    )}
                                </div>
                            </div>
                            {isAdmin && onDeleteRide && (
                                <button
                                    className="nearby-delete-btn"
                                    onClick={(e) => { e.stopPropagation(); onDeleteRide(ride._id); }}
                                    title="Delete this ride"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NearbyRides;
