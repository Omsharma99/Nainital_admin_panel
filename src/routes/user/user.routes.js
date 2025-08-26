import { Router } from "express";
import { logoutUser, sendOtp, verifyOtpAndLogin } from "../controllers/user.controller.js";
import { createScheduleController, getScheduleByIdController, getScheduleByUserIdController, deleteScheduleByIdController } from "../controllers/schedule.controller.js";
import { createDeliveryController, getDeliveriesByIdController, getDeliveriesByUserIdController, deleteDeliveryByIdController } from "../controllers/delivery.controller.js";
import { createBookingController, getBookingsByIdController, getBookingsByUserIdController, cancelBookingController, verifyBookingController } from "../controllers/booking.controller.js";
import { createEmergencyContactController, getEmergencyContactsByUserIdController } from "../controllers/emergency.controller.js";
import { sosController, shareLocationController } from "../controllers/sos.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder, verifyAndSavePayment } from "../controllers/payment.controller.js";

const router = Router();

// User routes
router.route('/sentOtp').post(sendOtp);
router.route('/verifyOtp').post(verifyOtpAndLogin);
router.route('/logout').post(verifyJWT, logoutUser);

// Payment routes
router.route('/order').post(verifyJWT, createOrder);
router.route('/payment').post(verifyJWT, verifyAndSavePayment);

// Schedule routes
router.route('/schedule').post(verifyJWT, createScheduleController);
router.route('/schedule/:scheduleId')
    .get(verifyJWT, getScheduleByIdController)
    .delete(verifyJWT, deleteScheduleByIdController);
router.route('/schedules/user/:userId').get(verifyJWT, getScheduleByUserIdController);

// Delivery routes
router.route('/delivery').post(verifyJWT, createDeliveryController);
router.route('/delivery/:deliveryId')
    .get(verifyJWT, getDeliveriesByIdController)
    .delete(verifyJWT, deleteDeliveryByIdController);
router.route('/deliveries/user/:userId').get(verifyJWT, getDeliveriesByUserIdController);

// Booking routes
router.route('/booking').post(verifyJWT, createBookingController);
router.route('/booking/:bookingId')
    .get(verifyJWT, getBookingsByIdController)
    .delete(verifyJWT, cancelBookingController);
router.route('/bookings/user/:userId').get(verifyJWT, getBookingsByUserIdController);
router.route('/booking/verify').post(verifyBookingController);

// Emergency routes
router.route('/emergency').post(verifyJWT, createEmergencyContactController);
router.route('/emergency/user/:userId').get(verifyJWT, getEmergencyContactsByUserIdController);

// SOS routes
router.route('/sos').post(verifyJWT, sosController);
router.route('/shareLocation').post(verifyJWT, shareLocationController);

export default router;
