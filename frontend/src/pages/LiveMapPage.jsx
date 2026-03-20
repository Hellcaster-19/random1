import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../components/MapView';
import ScheduleRideForm from '../components/ScheduleRideForm';
import apiService from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const LiveMapPage = () => {
  const { user } = useAuth();
  const [activeRides, setActiveRides] = useState([]);
  const [scheduledRides, setScheduledRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // Fetch rides from API
  const fetchRides = useCallback(async () => {
    try {
      setLoading(true);
      const [active, scheduled] = await Promise.all([
        apiService.getActiveRides().catch(() => []),
        apiService.getScheduledRides().catch(() => [])
      ]);
      setActiveRides(Array.isArray(active) ? active : (active?.rides || []));
      setScheduledRides(Array.isArray(scheduled) ? scheduled : (scheduled?.rides || []));
      setError(null);
    } catch (err) {
      console.error('Failed to fetch rides:', err);
      setError('Failed to load rides');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => console.warn('Geolocation error:', err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Fetch rides on mount and poll every 15s
  useEffect(() => {
    fetchRides();
    const interval = setInterval(fetchRides, 15000);
    return () => clearInterval(interval);
  }, [fetchRides]);

  const allRides = [...activeRides, ...scheduledRides];

  const formatTime = (dateStr) => {
    if (!dateStr) return 'Now';
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' });
  };

  const handleScheduleSuccess = (newRide) => {
    setShowScheduleForm(false);
    setSelectedRide(newRide);
    fetchRides();
  };

  const handleJoinRide = async (e, ride) => {
    e.stopPropagation(); // Prevents map selection when clicking join
    
    if (!user) {
      alert("You must be logged in to join a ride.");
      return;
    }

    if (!userLocation) {
      alert("Please enable location services so we can verify your proximity to the route.");
      return;
    }

    try {
      const result = await apiService.joinRide(ride._id, userLocation, user.name);
      if (result.success) {
        alert("Successfully joined the ride!");
        fetchRides();
      }
    } catch (err) {
      // Show exact alert text as requested
      alert("You are not in range for the pickup from happiness car ride. Please select another ride");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden h-screen flex flex-col">
      <style>{`
        .glass-sidebar {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(255, 122, 92, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 122, 92, 0.3);
          border-radius: 10px;
        }
        .mapboxgl-map {
          width: 100% !important;
          height: 100% !important;
        }
        .map-view {
          width: 100%;
          height: 100%;
        }
        .map-view .map-container {
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 py-3 bg-background-light dark:bg-background-dark z-50">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-background-dark text-xl">sentiment_satisfied</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight font-display">Happiness Campaign</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-primary text-sm font-bold border-b-2 border-primary pb-1" to="/tracker">Live Map</Link>
            <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/campaigns">Campaigns</Link>
            <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/about">About</Link>
          </div>
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-background-dark text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
            <span>Join the Ride</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 relative overflow-hidden">
        {/* Sidebar (rides list) */}
        <aside className="w-80 glass-sidebar flex flex-col z-40 relative">
          <div className="p-4 border-b border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">radio_button_checked</span>
                Live Rides
              </h3>
              <div className="flex items-center gap-2">
                {user && user.role === 'admin' && (
                  <button 
                    onClick={() => setShowScheduleForm(true)} 
                    className="bg-primary/20 text-primary hover:bg-primary hover:text-background-dark p-1.5 rounded-md transition-colors" 
                    title="Schedule New Ride"
                  >
                    <span className="material-symbols-outlined text-lg block">add_circle</span>
                  </button>
                )}
                <button onClick={fetchRides} className="text-primary hover:text-primary/80 p-1.5 transition-colors" title="Refresh rides">
                  <span className="material-symbols-outlined text-lg block">refresh</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{activeRides.length} active</span>
              <span className="mx-1">•</span>
              <span>{scheduledRides.length} scheduled</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {loading && allRides.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <span className="material-symbols-outlined text-4xl animate-spin mb-3">progress_activity</span>
                <p className="text-sm">Loading rides...</p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-3 text-red-400">error</span>
                <p className="text-sm text-red-400">{error}</p>
                <button onClick={fetchRides} className="mt-3 text-primary text-sm hover:underline">Retry</button>
              </div>
            )}

            {!loading && !error && allRides.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-3">directions_bike</span>
                <p className="text-sm font-medium">No rides available</p>
                <p className="text-xs mt-1 text-center">Check back soon or schedule a new ride!</p>
              </div>
            )}

            {/* Active Rides */}
            {activeRides.map((ride) => (
              <div
                key={ride._id}
                onClick={() => setSelectedRide(ride)}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/40 ${
                  selectedRide?._id === ride._id
                    ? 'border-primary/60 bg-primary/10'
                    : 'border-white/5 bg-white/5 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold truncate flex-1">{ride.title || ride.rideName}</h4>
                  <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-2 flex-shrink-0">Live</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-primary text-sm">directions_car</span>
                    <span>{ride.vehicleName || 'Happiness Bus'}</span>
                  </div>
                  {ride.location?.coordinates && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                      <span>{ride.location.coordinates[1].toFixed(4)}, {ride.location.coordinates[0].toFixed(4)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-primary text-sm">group</span>
                    <span>{ride.waypoints?.length || 0} / {ride.maxPassengers || 10} riders</span>
                  </div>
                  {ride.speed && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-primary text-sm">speed</span>
                      <span>{ride.speed} km/h</span>
                    </div>
                  )}
                  <button 
                    onClick={(e) => handleJoinRide(e, ride)}
                    className="mt-2 w-full py-2 bg-primary/10 hover:bg-primary hover:text-background-dark text-primary border border-primary/20 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm block">person_add</span>
                    Join Ride
                  </button>
                </div>
              </div>
            ))}

            {/* Divider between active & scheduled */}
            {activeRides.length > 0 && scheduledRides.length > 0 && (
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 border-t border-primary/10"></div>
                <span className="text-xs text-slate-500 font-medium uppercase">Scheduled</span>
                <div className="flex-1 border-t border-primary/10"></div>
              </div>
            )}

            {/* Scheduled Rides */}
            {scheduledRides.map((ride) => (
              <div
                key={ride._id}
                onClick={() => setSelectedRide(ride)}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/40 ${
                  selectedRide?._id === ride._id
                    ? 'border-primary/60 bg-primary/10'
                    : 'border-white/5 bg-white/5 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold truncate flex-1">{ride.title || ride.rideName}</h4>
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-2 flex-shrink-0">Scheduled</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                    <span>{formatTime(ride.scheduledStartTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-primary text-sm">directions_car</span>
                    <span>{ride.vehicleName || 'Happiness Bus'}</span>
                  </div>
                  {ride.location?.coordinates && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                      <span>{ride.location.coordinates[1].toFixed(4)}, {ride.location.coordinates[0].toFixed(4)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-primary text-sm">group</span>
                    <span>{ride.waypoints?.length || 0} / {ride.maxPassengers || 10} riders</span>
                  </div>
                  <button 
                    onClick={(e) => handleJoinRide(e, ride)}
                    className="mt-2 w-full py-2 bg-primary/10 hover:bg-primary hover:text-background-dark text-primary border border-primary/20 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm block">person_add</span>
                    Join Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Mapbox Map Area */}
        <div className="flex-1 relative">
          <MapView
            ride={selectedRide}
            scheduledRides={scheduledRides}
            userLocation={userLocation}
          />

          {/* Map overlay info */}
          <div className="absolute top-4 left-4 z-10 bg-background-dark/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-primary/20">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span className="text-slate-300">Active: {activeRides.length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                <span className="text-slate-300">Scheduled: {scheduledRides.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Ride Modal */}
        {showScheduleForm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-6">
            <div className="relative bg-background-light dark:bg-[#111827] w-full max-w-2xl max-h-full overflow-y-auto rounded-2xl shadow-2xl shadow-primary/20 border border-primary/20">
              <button 
                onClick={() => setShowScheduleForm(false)}
                className="absolute top-4 right-4 z-10 text-slate-400 hover:text-primary transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
              >
                <span className="material-symbols-outlined block">close</span>
              </button>
              <div className="p-6 pt-10">
                <ScheduleRideForm 
                  onScheduleSuccess={handleScheduleSuccess} 
                  onCancel={() => setShowScheduleForm(false)} 
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LiveMapPage;
