import express from "express";
import { adminClearance, protect } from "../middleware/authentication.js";
import { getOrder, getUserOrders, placeOrder } from "../controller/orderController.js";
const router = express.Router()

router.route('/').post(protect, placeOrder).get(protect, getUserOrders)
router.route('/orders').get(protect, adminClearance, getOrder)


export default router