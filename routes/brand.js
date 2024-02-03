import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import { createBrand, deleteBrand, getBrand, getBrands, getBrandsFromCategory, updateBrand } from "../controller/brandController.js";

const router = express.Router()

router.route('/').post(protect, createBrand).get(protect, getBrands)
router.route('/category').post(protect, getBrandsFromCategory)
router.route('/:id').get(protect, getBrand).put(protect, updateBrand).delete(protect, deleteBrand)

export default router