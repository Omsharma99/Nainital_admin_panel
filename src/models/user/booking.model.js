import { v4 as uuidv4 } from 'uuid';

// Check if seat is available for the selected segment
export const isSeatAvailable = async (pool, tripId, seatId, from_stop_id, to_stop_id) => {
    const query = `
    SELECT 1 FROM bookings
    WHERE tripId = $1 AND seatId = $2
    AND (
        (from_stop_id < $4 AND to_stop_id > $3)
    )
    `;
    const values = [tripId, seatId, from_stop_id, to_stop_id];
    const result = await pool.query(query, values);
    return result.rowCount === 0;
};

// Create a new booking with a unique verificationCode for QR
export const createBooking = async (pool, bookingData) => {
    const {
        userId,
        tripId,
        seatId,
        from_stop_id,
        to_stop_id,
    } = bookingData;

    const available = await isSeatAvailable(pool, tripId, seatId, from_stop_id, to_stop_id);
    if (!available) {
        throw new Error('Seat not available for the selected segment');
    }

    const bookingId = uuidv4();
    const verificationCode = uuidv4();

    const query = `
    INSERT INTO bookings (
      bookingId, userId, tripId, seatId, from_stop_id, to_stop_id, paymentStatus, verificationCode, used
    ) VALUES (
      $1, $2, $3, $4, $5, $6, 'Success', $7, FALSE
    ) RETURNING *;
    `;
    const values = [bookingId, userId, tripId, seatId, from_stop_id, to_stop_id, verificationCode];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating booking:', error.message);
        throw new Error('Database error while creating booking');
    }
};

// Get all bookings for a user
export const getBookingsByUserId = async (pool, userId) => {
    const query = `
    SELECT * FROM bookings
    WHERE userId = $1
    ORDER BY createdAt DESC;
    `;
    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        throw new Error('Database error while fetching bookings');
    }
};

// Get booking by bookingId
export const getBookingsById = async (pool, bookingId) => {
    const query = `
    SELECT * FROM bookings
    WHERE bookingId = $1
    ORDER BY createdAt DESC;
    `;
    try {
        const result = await pool.query(query, [bookingId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching booking by ID:', error.message);
        throw new Error('Database error while fetching booking by ID');
    }
};

// Cancel a booking (soft delete or actual delete as per your logic)
export const cancelBooking = async (pool, bookingId) => {
    const query = `
    DELETE FROM bookings
    WHERE bookingId = $1
    RETURNING *;
    `;
    try {
        const result = await pool.query(query, [bookingId]);
        if (result.rowCount === 0) {
            throw new Error('Booking not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error canceling booking:', error.message);
        throw new Error('Database error while canceling booking');
    }
};

// Verify a booking by scanning the QR (verificationCode)
export const verifyBookingByCode = async (pool, verificationCode) => {
    // Find the booking by verificationCode
    const selectQuery = `
        SELECT * FROM bookings
        WHERE verificationCode = $1
        LIMIT 1;
    `;
    const selectResult = await pool.query(selectQuery, [verificationCode]);
    const booking = selectResult.rows[0];

    if (!booking) {
        throw new Error('Invalid or unknown ticket');
    }
    if (booking.used) {
        throw new Error('Ticket already used');
    }

    // Optionally: check trip date/time validity here

    // Mark as used
    const updateQuery = `
        UPDATE bookings
        SET used = TRUE, usedAt = NOW()
        WHERE bookingId = $1
        RETURNING *;
    `;
    const updateResult = await pool.query(updateQuery, [booking.bookingid]);
    return updateResult.rows[0];
};