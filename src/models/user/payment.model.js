
import { v4 as uuidv4 } from 'uuid'

export const createPayment = async (pool, { userId, orderId, razorpayPaymentId, amount, currency = 'INR', status = 'paid' }) => {
    const paymentId = uuidv4()

    const result = await pool.query(
        `INSERT INTO payments_table 
         (paymentId, userId, orderId, razorpayPaymentId, amount, currency, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [paymentId, userId, orderId, razorpayPaymentId, amount, currency, status]
    )

    return result.rows[0]
}
