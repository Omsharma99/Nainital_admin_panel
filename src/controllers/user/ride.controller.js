import { saveRide, getRideHistory, getRideById, updateRideStatus } from '../models/ride.model.js';

export const createRideController = async (req, res) => {
    try {
        const { driverId, passengerId, pickupLocation, dropoffLocation } = req.body;
        const pool = req.pgPool;

        if (!driverId || !passengerId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: "driverId, passengerId, pickupLocation, and dropoffLocation are required" });
        }

        const newRide = await saveRide(pool, { driverId, passengerId, pickupLocation, dropoffLocation });
        return res.status(201).json({ ride: newRide, message: "Ride created successfully" });
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ message: "Failed to create ride" });
    }
};

export const getRideHistoryController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const pool = req.pgPool;

        if (!userId) {
            return res.status(400).json({ message: "userId parameter is required" });
        }

        const rides = await getRideHistory(pool, userId);
        return res.status(200).json({ rides, message: "Ride history fetched successfully" });
    } catch (error) {
        console.error('Error fetching ride history:', error);
        return res.status(500).json({ message: "Failed to fetch ride history" });
    }
};

export const getRideByIdController = async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const pool = req.pgPool;

        if (!rideId) {
            return res.status(400).json({ message: "rideId parameter is required" });
        }

        const ride = await getRideById(pool, rideId);
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        return res.status(200).json({ ride, message: "Ride details fetched successfully" });
    } catch (error) {
        console.error('Error fetching ride by ID:', error);
        return res.status(500).json({ message: "Failed to fetch ride details" });
    }
};

export const updateRideStatusController = async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const { status } = req.body;
        const pool = req.pgPool;

        if (!rideId || !status) {
            return res.status(400).json({ message: "rideId and status are required" });
        }

        const updatedRide = await updateRideStatus(pool, rideId, status);
        if (!updatedRide) {
            return res.status(404).json({ message: "Ride not found or status not updated" });
        }

        return res.status(200).json({ ride: updatedRide, message: "Ride status updated successfully" });
    } catch (error) {
        console.error('Error updating ride status:', error);
        return res.status(500).json({ message: "Failed to update ride status" });
    }
};