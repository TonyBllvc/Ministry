import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import { createCategory, getCategories, getCategory } from "../controller/categoryController.js";

const router = express.Router()


router.route('/').post(protect, createCategory).get(protect, getCategories)
router.route('/item').post(protect, getCategory)
export default router