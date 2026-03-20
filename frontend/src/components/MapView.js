import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapView.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

/**
 * MapView Component
 * Displays the interactive map with live route and vehicle marker
 */
const MapView = (props) => {
  const { ride, userLocation } = props;
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
    if (!mapLoaded || !ride || !ride.location) return;

    const [lng, lat] = ride.location.coordinates;

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

  // Keep references to scheduled markers to remove them if data changes
  const scheduledMarkersRef = useRef([]);

  // Add scheduled rides markers
  useEffect(() => {
    if (!mapLoaded) return;

    // Remove existing scheduled markers
    scheduledMarkersRef.current.forEach(marker => marker.remove());
    scheduledMarkersRef.current = [];

    const rides = props.scheduledRides || [];

    if (rides.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    let hasValidBounds = false;

    rides.forEach(scheduledRide => {
      if (!scheduledRide.location || !scheduledRide.location.coordinates) return;
      const [lng, lat] = scheduledRide.location.coordinates;

      const el = document.createElement('div');
      el.className = 'scheduled-marker';
      el.innerHTML = '🕒';
      el.style.fontSize = '24px';
      el.style.cursor = 'pointer';

      const timeText = scheduledRide.scheduledStartTime
        ? new Date(scheduledRide.scheduledStartTime).toLocaleString()
        : 'TBD';

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 15 })
            .setHTML(`<h4>${scheduledRide.title || 'Scheduled Ride'}</h4><p>Starts: ${timeText}</p>`)
        )
        .addTo(mapRef.current);

      scheduledMarkersRef.current.push(marker);
      bounds.extend([lng, lat]);
      hasValidBounds = true;

      // Draw route if available
      if (scheduledRide.route) {
        const routeId = `scheduled-route-${scheduledRide._id}`;

        // Remove old if exists
        if (mapRef.current.getLayer(routeId)) mapRef.current.removeLayer(routeId);
        if (mapRef.current.getSource(routeId)) mapRef.current.removeSource(routeId);

        mapRef.current.addSource(routeId, {
          type: 'geojson',
          data: scheduledRide.route
        });

        // Use a dashed or different colored line for scheduled rides
        mapRef.current.addLayer({
          id: routeId,
          type: 'line',
          source: routeId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3498db',
            'line-width': 4,
            'line-dasharray': [2, 2],
            'line-opacity': 0.6
          }
        });

        // Keep a reference to the layer ID so we can clean it up later if needed
        // Storing on the marker object for easy cleanup
        marker.routeLayerId = routeId;
      }
    });

    // Cleanup function for scheduled markers AND their routes
    scheduledMarkersRef.current.cleanupRoutes = () => {
      scheduledMarkersRef.current.forEach(marker => {
        if (marker.routeLayerId && mapRef.current) {
          if (mapRef.current.getLayer(marker.routeLayerId)) mapRef.current.removeLayer(marker.routeLayerId);
          if (mapRef.current.getSource(marker.routeLayerId)) mapRef.current.removeSource(marker.routeLayerId);
        }
      });
    };

    // If there is no active ride forcing map bounds over, scale to see all scheduled rides
    if (hasValidBounds && !props.ride) {
      mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 14, duration: 1000 });
    }

    return () => {
      if (scheduledMarkersRef.current && scheduledMarkersRef.current.cleanupRoutes) {
        scheduledMarkersRef.current.cleanupRoutes();
      }
    };

  }, [mapLoaded, props.scheduledRides, props.ride]);

  return (
    <div className="map-view">
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default MapView;
