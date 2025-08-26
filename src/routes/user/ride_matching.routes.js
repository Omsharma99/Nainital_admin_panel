import { Router } from 'express';
import { matchRideController } from '../controllers/ride_matching.controller.js';

const router = Router();

router.post('/match', matchRideController);

export default router;