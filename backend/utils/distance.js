/**
 * Calculate distance between two coordinates using Haversine formula
 * This is critical for 5km proximity validation
 * 
 * @param {Number} lat1 - Latitude of point 1
 * @param {Number} lon1 - Longitude of point 1
 * @param {Number} lat2 - Latitude of point 2
 * @param {Number} lon2 - Longitude of point 2
 * @returns {Number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

/**
 * Convert degrees to radians
 */
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Check if a point is within a certain radius of another point
 * 
 * @param {Number} userLat - User's latitude
 * @param {Number} userLon - User's longitude
 * @param {Number} vehicleLat - Vehicle's latitude
 * @param {Number} vehicleLon - Vehicle's longitude
 * @param {Number} maxDistanceKm - Maximum allowed distance in km
 * @returns {Object} { isWithinRange: boolean, distance: number }
 */
const isWithinProximity = (userLat, userLon, vehicleLat, vehicleLon, maxDistanceKm) => {
  const distance = calculateDistance(userLat, userLon, vehicleLat, vehicleLon);

  return {
    isWithinRange: distance <= maxDistanceKm,
    distance: parseFloat(distance.toFixed(2))
  };
};

/**
 * Distance from a point to a line segment approximation
 */
const distanceToSegment = (pLat, pLon, vLat, vLon, wLat, wLon) => {
  const l2 = Math.pow(wLat - vLat, 2) + Math.pow(wLon - vLon, 2);
  if (l2 === 0) return calculateDistance(pLat, pLon, vLat, vLon);
  let t = ((pLat - vLat) * (wLat - vLat) + (pLon - vLon) * (wLon - vLon)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projLat = vLat + t * (wLat - vLat);
  const projLon = vLon + t * (wLon - vLon);
  return calculateDistance(pLat, pLon, projLat, projLon);
};

/**
 * Find minimum distance from user point to geojson polyline coordinates
 */
const distanceToPolyline = (userLat, userLon, coordinates) => {
  if (!coordinates || coordinates.length < 2) return Infinity;
  let minDistance = Infinity;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const p1 = coordinates[i]; // [lon, lat]
    const p2 = coordinates[i + 1];
    const dist = distanceToSegment(userLat, userLon, p1[1], p1[0], p2[1], p2[0]);
    if (dist < minDistance) minDistance = dist;
  }
  return minDistance;
};

module.exports = {
  calculateDistance,
  isWithinProximity,
  distanceToPolyline
};
