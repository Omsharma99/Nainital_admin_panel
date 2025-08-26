
import Razorpay from 'razorpay'
import { createPayment } from '../models/payment.model.js'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Create a new order for Razorpay
export const createOrder = async (req, res) => {
    // console.log("hello1")
    try {
        const { amount } = req.body
        const userId = req.user.userid // ✅ Coming from verifyJWT middleware
        console.log("this is the user",userId)
        const options = {
            amount: amount * 100, // Razorpay expects amount in paisa
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
        }
//    console.log("hello1")
        const order = await razorpay.orders.create(options)

        res.status(201).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            userId
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Order creation failed', error: error.message })
    }
}

// Save the payment after verifying on client side
export const verifyAndSavePayment = async (req, res) => {
     console.log("🔔 verifyAndSavePayment called");
    try {
        const pool = req.pgPool
        const { razorpay_payment_id, razorpay_order_id, amount } = req.body
        const userId = req.user.userid // ✅ From JWT middleware

        const payment = await createPayment(pool, {
            userId,
            orderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            amount,
        })
        console.log("payment successful",userId)
        res.status(200).json({
            success: true,
            message: 'Payment Successful and Saved',
            payment
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Payment failed to save', error: error.message })
    }
}