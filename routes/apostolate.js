import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent, updateWithImage } from "../controller/apostolateController.js";
import store from "../middleware/imageUpload.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

// router.use(protect)
router.put('/upload', protect, store.single('image'), updateWithImage)
router.route('/').get(getContents).post(protect, store.single('image'), createContent).put(protect, updateContent).delete(protect, deleteContent)
router.route('/content').get(getContent)

// router.route('/').get( getContents).post( createContent).put( updateContent).delete( deleteContent)
// router.route('/content').post( getContent)

export default router