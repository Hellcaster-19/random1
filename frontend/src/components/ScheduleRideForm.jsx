import React, { useState } from 'react';
import apiService from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import LocationInput from './LocationInput';
import './ScheduleRideForm.css';

const ScheduleRideForm = ({ onScheduleSuccess, onCancel }) => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        startLocation: null,
        destination: null,
        scheduledStartTime: '',
        vehicleName: 'Happiness Bus',
        maxPassengers: 10
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to schedule a ride');
            return;
        }

        try {
            if (!formData.startLocation || !formData.destination) {
                setError('Please select start and destination locations from the map search.');
                return;
            }

            setIsLoading(true);
            setError('');

            const rideData = {
                title: formData.title,
                rideName: formData.title, // Backward compatibility
                scheduledStartTime: formData.scheduledStartTime,
                vehicleName: formData.vehicleName,
                maxPassengers: parseInt(formData.maxPassengers),
                location: {
                    type: 'Point',
                    coordinates: formData.startLocation.coordinates
                },
                destination: {
                    type: 'Point',
                    coordinates: formData.destination.coordinates
                }
            };

            const result = await apiService.scheduleRide(rideData);

            if (result.success) {
                if (onScheduleSuccess) onScheduleSuccess(result.ride);
            } else {
                setError(result.message || 'Failed to schedule ride');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="schedule-form-container">
            <h3>📅 Schedule a Happiness Ride</h3>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ride Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Morning Campus Loop"
                    />
                </div>

                <LocationInput
                    label="Start Location (Search)"
                    placeholder="e.g. Shopping Mall, University..."
                    required={true}
                    onLocationSelect={(loc) => setFormData(prev => ({ ...prev, startLocation: loc }))}
                />

                <LocationInput
                    label="Destination Location (Search)"
                    placeholder="Where are you heading?"
                    required={true}
                    onLocationSelect={(loc) => setFormData(prev => ({ ...prev, destination: loc }))}
                />

                <div className="form-group">
                    <label>Scheduled Start Time</label>
                    <input
                        type="datetime-local"
                        name="scheduledStartTime"
                        value={formData.scheduledStartTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <label>Vehicle Name</label>
                        <input
                            type="text"
                            name="vehicleName"
                            value={formData.vehicleName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <label>Max Passengers</label>
                        <input
                            type="number"
                            name="maxPassengers"
                            min="1"
                            value={formData.maxPassengers}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Scheduling...' : 'Schedule Ride'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleRideForm;
