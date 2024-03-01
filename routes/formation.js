import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent, updateWithImage } from "../controller/formationController.js";
import store from "../middleware/imageUpload.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

// router.use(protect)
router.put('/upload', protect, store.single('image'), updateWithImage)
router.route('/').get(getContents).post(protect, store.single('image'), createContent).put(protect, updateContent).delete(protect, deleteContent)
router.route('/content').get(getContent)
export default router