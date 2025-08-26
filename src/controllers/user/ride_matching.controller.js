import { getAvailableDrivers } from '../models/ride.model.js';
import { getDistancesFromGoogle } from '../ride_matching/algorithm.js';

export const matchRideController = async (req, res) => {
    try {
        const { pickupLat, pickupLng } = req.body;
        const pool = req.pgPool;

        if (!pickupLat || !pickupLng) {
            return res.status(400).json({ message: "pickupLat and pickupLng are required" });
        }

        const drivers = await getAvailableDrivers(pool);
        if (!drivers.length) {
            return res.status(404).json({ message: "No available drivers found" });
        }

        const userLocation = { lat: pickupLat, lng: pickupLng };
        const distances = await getDistancesFromGoogle(userLocation, drivers);

        const matchedDrivers = drivers.map((driver, idx) => ({
            ...driver,
            distance: distances[idx].distance.value, // meters
            duration: distances[idx].duration.value  // seconds
        }));

        matchedDrivers.sort((a, b) => a.duration - b.duration);

        res.status(200).json({ matches: matchedDrivers });
    } catch (error) {
        console.error('Error matching ride:', error);
        res.status(500).json({ message: "Failed to match ride" });
    }
};