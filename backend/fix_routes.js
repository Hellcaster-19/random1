require('dotenv').config();
const mongoose = require('mongoose');
const Ride = require('./models/Ride');
const mapboxService = require('./services/mapboxService');

async function fixRoutes() {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to DB');

    const rides = await Ride.find({ status: 'scheduled' });
    console.log(`Found ${rides.length} scheduled rides`);

    for (let ride of rides) {
        if (!ride.route && ride.destination && ride.destination.coordinates) {
            console.log(`Calculating route for ride ${ride.rideName}...`);
            const routeResult = await mapboxService.calculateRouteWithWaypoints(
                ride.location,
                [],
                ride.destination
            );

            if (routeResult.success) {
                ride.route = routeResult.route;
                ride.markModified('route');
                await ride.save();
                console.log(`✅ Saved route for ${ride.rideName}`);
            } else {
                console.log(`❌ Failed:`, routeResult.message);
            }
        } else if (ride.route) {
            console.log(`✅ Ride ${ride.rideName} already has a route`);
        } else {
            console.log(`⚠️ Ride ${ride.rideName} missing destination`);
        }
    }

    mongoose.connection.close();
}

fixRoutes();
