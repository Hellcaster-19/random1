const axios = require('axios');

/**
 * Mapbox Service
 * Handles all interactions with Mapbox Directions API
 */
class MapboxService {
  constructor() {
    this.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    this.baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  }

  /**
   * Get route from Mapbox Directions API
   * 
   * @param {Array} waypoints - Array of [longitude, latitude] coordinates
   * @returns {Object} Route data with geometry and duration
   */
  async getRoute(waypoints) {
    try {
      // Format waypoints as "lon,lat;lon,lat;..."
      const coordinates = waypoints
        .map(wp => `${wp[0]},${wp[1]}`)
        .join(';');

      const url = `${this.baseURL}/${coordinates}`;
      
      const response = await axios.get(url, {
        params: {
          access_token: this.accessToken,
          geometries: 'geojson',
          overview: 'full',
          steps: false
        }
      });

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        
        return {
          success: true,
          geometry: route.geometry,
          duration: route.duration,
          distance: route.distance
        };
      }

      return {
        success: false,
        message: 'No route found'
      };

    } catch (error) {
      console.error('Mapbox API Error:', error.response?.data || error.message);
      
      return {
        success: false,
        message: 'Failed to fetch route',
        error: error.message
      };
    }
  }

  /**
   * Calculate route with multiple waypoints
   * 
   * @param {Object} currentLocation - Current vehicle location {coordinates: [lon, lat]}
   * @param {Array} waypoints - Array of waypoint objects
   * @param {Object} destination - Destination {coordinates: [lon, lat]}
   * @returns {Object} Complete route
   */
  async calculateRouteWithWaypoints(currentLocation, waypoints, destination) {
    try {
      // Build coordinate array: start -> waypoints -> destination
      const coordinates = [
        currentLocation.coordinates,
        ...waypoints.map(wp => wp.location.coordinates),
        destination.coordinates
      ];

      const routeData = await this.getRoute(coordinates);
      
      if (routeData.success) {
        return {
          success: true,
          route: {
            type: 'Feature',
            geometry: routeData.geometry,
            properties: {
              duration: routeData.duration,
              distance: routeData.distance
            }
          }
        };
      }

      return routeData;

    } catch (error) {
      console.error('Route calculation error:', error);
      
      return {
        success: false,
        message: 'Route calculation failed',
        error: error.message
      };
    }
  }
}

module.exports = new MapboxService();
