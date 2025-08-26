import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { addShuttle } from "../../controllers/driver/shuttle.controller.js";

const router = Router();


router.route("/book-shuttle").post(verifyJWT,addShuttle);


export default router; 