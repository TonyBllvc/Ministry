import express from "express";
import { protect } from "../middleware/authentication.js";
import { webHookHandler } from "../middleware/webhook.js";

const router = express.Router()

// // Use raw body parser middleware
// router.use(express.raw({ type: 'application/json' }));

// inactive
router.route('/').post(webHookHandler)

export default router