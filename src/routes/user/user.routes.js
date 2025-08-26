import { Router } from "express";

// ----------------- User controllers -----------------
import {
    logoutUser,
    sendOtp,
    verifyOtpAndLogin
} from "../../controllers/user/user.controller.js";

// ----------------- Schedule controllers -----------------
import {
    createScheduleController,
    getScheduleByIdController,
    getScheduleByUserIdController,
    deleteScheduleByIdController
} from "../../controllers/user/schedule.controller.js";

// ----------------- Delivery controllers -----------------
import {
    createDeliveryController,
    getDeliveriesByIdController,
    getDeliveriesByUserIdController,
    deleteDeliveryByIdController
} from "../../controllers/user/delivery.controller.js";

// ----------------- Booking controllers -----------------
import {
    createBookingController,
    getBookingsByIdController,
    getBookingsByUserIdController,
    cancelBookingController,
    verifyBookingController
} from "../../controllers/user/booking.controller.js";

// ----------------- Emergency controllers -----------------
import {
    createEmergencyContactController,
    getEmergencyContactsByUserIdController
} from "../../controllers/user/emergency.controller.js";

// ----------------- SOS controllers -----------------
import {
    sosController,
    shareLocationController
} from "../../controllers/user/sos.controller.js";

// ----------------- Payment controllers -----------------
import {
    createOrder,
    verifyAndSavePayment
} from "../../controllers/user/payment.controller.js";

// ----------------- Middleware -----------------
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// ----------------- User routes -----------------
router.post('/sentOtp', sendOtp);
router.post('/verifyOtp', verifyOtpAndLogin);
router.post('/logout', verifyJWT, logoutUser);

// ----------------- Payment routes -----------------
router.post('/order', verifyJWT, createOrder);
router.post('/payment', verifyJWT, verifyAndSavePayment);

// ----------------- Schedule routes -----------------
router.post('/schedule', verifyJWT, createScheduleController);
router.get('/schedule/:scheduleId', verifyJWT, getScheduleByIdController);
router.delete('/schedule/:scheduleId', verifyJWT, deleteScheduleByIdController);
router.get('/schedules/user/:userId', verifyJWT, getScheduleByUserIdController);

// ----------------- Delivery routes -----------------
router.post('/delivery', verifyJWT, createDeliveryController);
router.get('/delivery/:deliveryId', verifyJWT, getDeliveriesByIdController);
router.delete('/delivery/:deliveryId', verifyJWT, deleteDeliveryByIdController);
router.get('/deliveries/user/:userId', verifyJWT, getDeliveriesByUserIdController);

// ----------------- Booking routes -----------------
router.post('/booking', verifyJWT, createBookingController);
router.get('/booking/:bookingId', verifyJWT, getBookingsByIdController);
router.delete('/booking/:bookingId', verifyJWT, cancelBookingController);
router.get('/bookings/user/:userId', verifyJWT, getBookingsByUserIdController);
router.post('/booking/verify', verifyBookingController);

// ----------------- Emergency routes -----------------
router.post('/emergency', verifyJWT, createEmergencyContactController);
router.get('/emergency/user/:userId', verifyJWT, getEmergencyContactsByUserIdController);

// ----------------- SOS routes -----------------
router.post('/sos', verifyJWT, sosController);
router.post('/shareLocation', verifyJWT, shareLocationController);

export default router;
