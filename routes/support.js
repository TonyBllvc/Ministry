import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent, updateWithImage } from "../controller/supportController.js";
import store from "../middleware/imageUpload.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

router.use(protect)
router.put('/upload/', store.single('image'), updateWithImage)
router.route('/').get( getContents).post(store.single('image'), createContent).put( updateContent).delete( deleteContent)
router.route('/content').get( getContent)

export default router