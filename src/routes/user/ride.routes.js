import { Router } from 'express';
import {
    createRideController,
    getRideHistoryController,
    getRideByIdController,
    updateRideStatusController
} from '../controllers/ride.controller.js';

const router = Router();

router.post('/', createRideController);
router.get('/history/:userId', getRideHistoryController);
router.get('/:rideId', getRideByIdController);
router.put('/:rideId/status', updateRideStatusController);

export default router;