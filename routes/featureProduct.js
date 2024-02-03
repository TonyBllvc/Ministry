import express from "express";
import { protect } from "../middleware/authentication.js";
import { createFeaturedProduct, getFeaturedProduct } from "../controller/featuredProductController.js";
const router = express.Router()

router.route('/').post(protect, createFeaturedProduct).get(protect, getFeaturedProduct)

export default router