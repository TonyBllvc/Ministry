import express from "express";
import { protect } from "../middleware/authentication.js";
import { getProductForCart } from "../controller/productController.js";

const router = express.Router()

router.route('/').post(protect, getProductForCart)

export default router