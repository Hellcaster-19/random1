/**
 * Vehicle Movement Simulator
 * Use this to simulate the happiness vehicle moving in real-time
 * 
 * Usage:
 * 1. Start backend server
 * 2. Create a ride (note the ride ID)
 * 3. Update RIDE_ID below
 * 4. Run: node test-vehicle-simulator.js
 */

const io = require('socket.io-client');

// ============ CONFIGURATION ============
const RIDE_ID = '65a1b2c3d4e5f6g7h8i9j0k1'; // REPLACE WITH ACTUAL RIDE ID
const SERVER_URL = 'http://localhost:5000';

// Starting position (Delhi, India)
let currentLat = 28.6139;
let currentLng = 77.2090;

// Movement parameters
const SPEED_KM_PER_HOUR = 40;
const UPDATE_INTERVAL_MS = 3000; // Update every 3 seconds
const MOVEMENT_DIRECTION = 'northeast'; // Options: north, south, east, west, northeast, northwest, southeast, southwest

// ============ CALCULATIONS ============

// Calculate how much to move per update
const hoursPerUpdate = UPDATE_INTERVAL_MS / (1000 * 60 * 60);
const kmPerUpdate = SPEED_KM_PER_HOUR * hoursPerUpdate;

// Convert km to approximate degrees (rough approximation)
const latDegreesPerKm = 1 / 111; // 1 degree latitude ≈ 111 km
const lngDegreesPerKm = 1 / (111 * Math.cos(currentLat * Math.PI / 180));

const latChange = kmPerUpdate * latDegreesPerKm;
const lngChange = kmPerUpdate * lngDegreesPerKm;

// Direction vectors
const directions = {
  north: { lat: latChange, lng: 0 },
  south: { lat: -latChange, lng: 0 },
  east: { lat: 0, lng: lngChange },
  west: { lat: 0, lng: -lngChange },
  northeast: { lat: latChange, lng: lngChange },
  northwest: { lat: latChange, lng: -lngChange },
  southeast: { lat: -latChange, lng: lngChange },
  southwest: { lat: -latChange, lng: -lngChange }
};

const movement = directions[MOVEMENT_DIRECTION] || directions.northeast;

// ============ SOCKET CONNECTION ============

console.log('🚗 Happiness Vehicle Simulator Starting...');
console.log(`📡 Connecting to: ${SERVER_URL}`);
console.log(`🎯 Ride ID: ${RIDE_ID}`);
console.log(`⚡ Speed: ${SPEED_KM_PER_HOUR} km/h`);
console.log(`📍 Starting Position: ${currentLat}, ${currentLng}`);
console.log(`➡️  Direction: ${MOVEMENT_DIRECTION}`);
console.log('');

const socket = io(SERVER_URL, {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to server');
  console.log('🚀 Starting vehicle movement...');
  console.log('');
  
  startMovement();
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

// ============ MOVEMENT SIMULATION ============

let updateCount = 0;

function startMovement() {
  setInterval(() => {
    updateCount++;
    
    // Update position
    currentLat += movement.lat;
    currentLng += movement.lng;
    
    // Send location update to server
    socket.emit('vehicleLocationUpdate', {
      rideId: RIDE_ID,
      location: {
        latitude: currentLat,
        longitude: currentLng
      }
    });
    
    console.log(`📍 Update #${updateCount}: Lat: ${currentLat.toFixed(6)}, Lng: ${currentLng.toFixed(6)}`);
    
  }, UPDATE_INTERVAL_MS);
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('');
  console.log('🛑 Stopping vehicle simulator...');
  socket.disconnect();
  process.exit(0);
});
