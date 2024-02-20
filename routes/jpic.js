import express from "express";
import { createContent, deleteContent, getContent, getContents, sortContent, updateContent, updateWithImage } from "../controller/jpicController.js";
import store from "../middleware/imageUpload.js";
// import uploadMiddleware from "../middleware/imageUpload.js";

const router = express.Router()

router.put('/upload/', store.single('image'), updateWithImage)
router.route('/').get(getContents).post(store.single('image'), createContent).put(updateContent).delete(deleteContent)
// router.route('/content').get(getContent)
// router.route('/content/sort').get(sortContent)

export default router