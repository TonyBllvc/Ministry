import express from "express";
import { protect } from "../middleware/authentication.js";
import { getProductForWishlist } from "../controller/productController.js";

const router = express.Router()

router.route('/').post(protect, getProductForWishlist)

export default router