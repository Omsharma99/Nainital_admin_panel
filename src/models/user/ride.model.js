import { v4 as uuidv4 } from 'uuid';

export const saveRide = async (pool, { driverId, passengerId, pickupLocation, dropoffLocation }) => {
    const rideId = uuidv4();
    const query = `
        INSERT INTO rides (rideId, driverId, passengerId, pickupLocation, dropoffLocation)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
    try {
        const result = await pool.query(query, [rideId, driverId, passengerId, pickupLocation, dropoffLocation]);
        return result.rows[0];
    } catch (error) {
        console.error('Error saving ride:', error);
        throw new Error('Failed to save ride');
    }
};

export const getRideHistory = async (pool, userId) => {
    const query = `
        SELECT * FROM rides
        WHERE driverId = $1 OR passengerId = $1
        ORDER BY createdAt DESC;
        `;
    
    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching ride history:', error);
        throw new Error('Failed to fetch ride history');
    }
};

export const getAvailableDrivers = async (pool) => {
    const query = `
        SELECT driverId, currentLat, currentLng
        FROM drivers
        WHERE status = 'available';
    `;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching available drivers:', error);
        throw new Error('Failed to fetch available drivers');
    }
};

export const getRideById = async (pool, rideId) => {
    const query = `
        SELECT * FROM rides
        WHERE rideId = $1;
    `;
    try {
        const result = await pool.query(query, [rideId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching ride by ID:', error);
        throw new Error('Failed to fetch ride by ID');
    }
}

export const updateRideStatus = async (pool, rideId, status) => {
    const query = `
        UPDATE rides
        SET status = $1
        WHERE rideId = $2
        RETURNING *;
    `;
    try {
        const result = await pool.query(query, [status, rideId]);
        return result.rows[0];      
    } catch (error) {
        console.error('Error updating ride status:', error);
        throw new Error('Failed to update ride status');
    }
};


