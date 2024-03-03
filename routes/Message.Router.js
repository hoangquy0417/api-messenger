import express from 'express';
import {sendMessage, getMessage} from '../controllers/Message.Controller.js';
import protectRouter from '../middleware/ProtectRoute.js';
const router = express.Router();
// midleware: Protect Router
router.get("/:id",protectRouter,getMessage);
router.post("/send/:id",protectRouter,sendMessage);
export default router;