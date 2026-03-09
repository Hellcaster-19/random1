const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rideName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  route: {
    type: Object, // Stores the GeoJSON route from Mapbox
    default: null
  },
  waypoints: [{
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    },
    userName: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number] // [longitude, latitude]
  },
  speed: {
    type: Number,
    default: 40 // km/h
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for geospatial queries
rideSchema.index({ currentLocation: '2dsphere' });

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
