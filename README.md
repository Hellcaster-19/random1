# 🎉 HAPPINESS CAMPAIGN - BTech Project

A **production-ready** full-stack web application that enables users to track and join a moving "Happiness Ride" in real-time with geolocation-based validation.

---

## 📋 PROJECT OVERVIEW

The Happiness Campaign is a real-time location-based web application where:
- Users can view a live happiness ride moving on a map
- Users can join the ride if they are within **5 km** of the vehicle
- Route automatically updates when new users join
- Real-time updates broadcast to all connected users via WebSockets

---

## 🛠️ TECHNOLOGY STACK

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.io** - Real-time bidirectional communication
- **Mapbox Directions API** - Route calculation

### Frontend
- **React.js** - UI framework
- **Mapbox GL JS** - Interactive maps
- **Socket.io Client** - Real-time updates
- **Axios** - HTTP requests

---

## 📁 PROJECT STRUCTURE

```
happiness-campaign/
│
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── rideController.js    # Request handlers
│   ├── models/
│   │   └── Ride.js              # MongoDB schema
│   ├── routes/
│   │   └── rideRoutes.js        # API routes
│   ├── services/
│   │   ├── rideService.js       # Business logic
│   │   └── mapboxService.js     # Mapbox integration
│   ├── sockets/
│   │   └── rideSocket.js        # WebSocket handlers
│   ├── utils/
│   │   └── distance.js          # Haversine formula
│   ├── .env.example             # Environment template
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.js       # Map component
│   │   │   ├── MapView.css
│   │   │   ├── RideInfo.js      # Ride details
│   │   │   └── RideInfo.css
│   │   ├── services/
│   │   │   ├── apiService.js    # API calls
│   │   │   └── socketService.js # WebSocket client
│   │   ├── utils/
│   │   │   └── geolocation.js   # Location utilities
│   │   ├── App.js               # Main component
│   │   ├── App.css
│   │   └── index.js             # Entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
└── README.md
```

---

## 🚀 INSTALLATION & SETUP

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **Mapbox Account** (free tier)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd happiness-campaign
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file from template:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/happiness-campaign
PORT=5000
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
CORS_ORIGIN=http://localhost:3000
MAX_JOIN_DISTANCE_KM=5
```

**Get Mapbox Token:**
1. Go to https://www.mapbox.com/
2. Sign up for free account
3. Go to Account → Tokens
4. Copy your default token

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
REACT_APP_DEFAULT_LAT=28.6139
REACT_APP_DEFAULT_LNG=77.2090
REACT_APP_DEFAULT_ZOOM=12
```

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud) and update the connection string in backend `.env`

---

## ▶️ RUNNING THE APPLICATION

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```

Frontend will open at: **http://localhost:3000**

---

## 🧪 TESTING THE APPLICATION

### Method 1: Using MongoDB Compass or Shell

**Insert a test ride:**
```javascript
db.rides.insertOne({
  rideName: "Happiness Express",
  status: "active",
  currentLocation: {
    type: "Point",
    coordinates: [77.2090, 28.6139]  // [longitude, latitude] - Delhi
  },
  destination: {
    type: "Point",
    coordinates: [77.2295, 28.6358]  // Connaught Place
  },
  waypoints: [],
  speed: 40,
  route: null
})
```

### Method 2: Using Postman

**Create Ride:**
```
POST http://localhost:5000/api/rides
Content-Type: application/json

{
  "rideName": "Happiness Express",
  "currentLocation": {
    "coordinates": [77.2090, 28.6139]
  },
  "destination": {
    "coordinates": [77.2295, 28.6358]
  },
  "speed": 40
}
```

### Method 3: Simulate Vehicle Movement

Create a file `backend/test-movement.js`:

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:5000');

const rideId = 'YOUR_RIDE_ID_HERE'; // Replace with actual ride ID

// Simulate movement
let lat = 28.6139;
let lng = 77.2090;

setInterval(() => {
  lat += 0.001; // Move north
  lng += 0.001; // Move east
  
  socket.emit('vehicleLocationUpdate', {
    rideId: rideId,
    location: { latitude: lat, longitude: lng }
  });
  
  console.log(`Moved to: ${lat}, ${lng}`);
}, 5000); // Every 5 seconds
```

Run: `node backend/test-movement.js`

---

## 🎯 KEY FEATURES DEMONSTRATION

### 1. Real-Time Location Updates
- Vehicle marker moves on map
- Route updates automatically
- All connected users see changes

### 2. 5km Proximity Validation
- User clicks "Join Ride"
- Backend validates distance
- If > 5km, join is rejected
- Error message shows actual distance

### 3. Route Recalculation
- User within 5km joins successfully
- Mapbox calculates new route
- Route includes new waypoint
- All users see updated route

### 4. Socket.io Real-Time Events
- Location updates broadcast
- Route changes propagate
- Multiple users stay synchronized

---

## 🎓 VIVA PREPARATION

### Core Concepts to Explain

**1. Why WebSockets over HTTP?**
> HTTP is request-response. For real-time tracking, we need continuous updates. WebSockets maintain a persistent connection, allowing the server to push updates to clients instantly.

**2. Why Server-Side Validation?**
> Client-side validation can be bypassed. The 5km rule is enforced on the backend using the Haversine formula, ensuring users cannot cheat the system.

**3. How Does Route Recalculation Work?**
> When a user joins, we send: current location → user's location → destination to Mapbox Directions API. It returns an optimized route, which we store and broadcast.

**4. What is the Haversine Formula?**
> A mathematical formula to calculate great-circle distance between two points on a sphere using latitude/longitude. Used to ensure accurate distance validation.

**5. Database Choice: Why MongoDB?**
> GeoJSON support with 2dsphere indexes makes MongoDB ideal for location-based queries. We store coordinates as GeoJSON Point objects.

**6. Scalability Considerations**
> Socket.io rooms ensure messages only go to relevant users. We could add Redis for session management and horizontal scaling.

---

## 🐛 TROUBLESHOOTING

### Issue: Map doesn't load
**Solution:** Check Mapbox token in frontend `.env`

### Issue: "Ride not found"
**Solution:** Create a test ride in MongoDB

### Issue: Location permission denied
**Solution:** Allow location access in browser settings

### Issue: Distance validation always fails
**Solution:** Verify coordinates are [longitude, latitude] not [lat, lng]

### Issue: Socket not connecting
**Solution:** Ensure backend is running and CORS_ORIGIN is correct

---

## 📊 API ENDPOINTS

### Rides
```
GET    /api/rides           - Get all active rides
GET    /api/rides/:id       - Get ride by ID
POST   /api/rides           - Create new ride
POST   /api/rides/:id/join  - Join ride (5km validation)
PUT    /api/rides/:id/location - Update vehicle location
PUT    /api/rides/:id/complete - Complete ride
```

### Socket.io Events

**Client → Server:**
- `joinRideRoom` - Join a ride's updates
- `leaveRideRoom` - Leave ride updates
- `vehicleLocationUpdate` - Update vehicle position

**Server → Client:**
- `locationUpdated` - Vehicle moved
- `routeUpdated` - Route recalculated
- `rideEnded` - Ride completed

---

## 🏆 PROJECT HIGHLIGHTS

✅ **Production-Ready Code** - Clean, modular, documented  
✅ **Real-Time Updates** - WebSocket-based live tracking  
✅ **Geolocation Security** - Server-side proximity validation  
✅ **Professional UI** - Responsive, intuitive design  
✅ **Scalable Architecture** - MVC pattern, service layer  
✅ **Industry Standards** - Environment variables, error handling  

---

## 📝 LICENSE

This project is for educational purposes (BTech submission).

---

## 👨‍💻 DEVELOPED BY

**BTech Student**  
Academic Year 2024-25

---

## 🙏 ACKNOWLEDGMENTS

- Mapbox for mapping services
- Socket.io for real-time communication
- MongoDB for geospatial data support

---

**Ready to spread happiness! 🎉**
