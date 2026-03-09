import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapView.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

/**
 * MapView Component
 * Displays the interactive map with live route and vehicle marker
 */
const MapView = ({ ride, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const vehicleMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const routeLayerId = 'route-layer';
  const routeSourceId = 'route-source';

  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return; // Map already initialized

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [
        parseFloat(process.env.REACT_APP_DEFAULT_LNG) || 77.2090,
        parseFloat(process.env.REACT_APP_DEFAULT_LAT) || 28.6139
      ],
      zoom: parseFloat(process.env.REACT_APP_DEFAULT_ZOOM) || 12
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      setMapLoaded(true);
      console.log('🗺️ Map loaded successfully');
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update vehicle marker
  useEffect(() => {
    if (!mapLoaded || !ride || !ride.currentLocation) return;

    const [lng, lat] = ride.currentLocation.coordinates;

    if (vehicleMarkerRef.current) {
      // Update existing marker
      vehicleMarkerRef.current.setLngLat([lng, lat]);
    } else {
      // Create new vehicle marker
      const el = document.createElement('div');
      el.className = 'vehicle-marker';
      el.innerHTML = '🚗';
      el.style.fontSize = '32px';
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${ride.rideName}</h3><p>Happiness Ride</p>`)
        )
        .addTo(mapRef.current);

      vehicleMarkerRef.current = marker;
    }

    // Center map on vehicle
    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 14,
      duration: 1000
    });

  }, [mapLoaded, ride]);

  // Update user location marker
  useEffect(() => {
    if (!mapLoaded || !userLocation) return;

    const { latitude, longitude } = userLocation;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([longitude, latitude]);
    } else {
      const el = document.createElement('div');
      el.className = 'user-marker';
      el.innerHTML = '📍';
      el.style.fontSize = '24px';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 15 })
            .setHTML('<p><strong>Your Location</strong></p>')
        )
        .addTo(mapRef.current);

      userMarkerRef.current = marker;
    }
  }, [mapLoaded, userLocation]);

  // Update route
  useEffect(() => {
    if (!mapLoaded || !ride || !ride.route) return;

    const map = mapRef.current;

    // Remove existing route if present
    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
    }
    if (map.getSource(routeSourceId)) {
      map.removeSource(routeSourceId);
    }

    // Add new route
    map.addSource(routeSourceId, {
      type: 'geojson',
      data: ride.route
    });

    map.addLayer({
      id: routeLayerId,
      type: 'line',
      source: routeSourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FF6B6B',
        'line-width': 6,
        'line-opacity': 0.8
      }
    });

    console.log('🛣️ Route updated on map');

  }, [mapLoaded, ride?.route]);

  // Add waypoint markers
  useEffect(() => {
    if (!mapLoaded || !ride || !ride.waypoints) return;

    ride.waypoints.forEach((waypoint, index) => {
      const [lng, lat] = waypoint.location.coordinates;

      const el = document.createElement('div');
      el.className = 'waypoint-marker';
      el.innerHTML = '⭐';
      el.style.fontSize = '20px';

      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 15 })
            .setHTML(`<p><strong>${waypoint.userName}</strong><br/>Joined: ${new Date(waypoint.joinedAt).toLocaleTimeString()}</p>`)
        )
        .addTo(mapRef.current);
    });

  }, [mapLoaded, ride?.waypoints]);

  return (
    <div className="map-view">
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default MapView;
