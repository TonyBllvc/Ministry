import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent, updateWithImage } from "../controller/formationController.js";
import store from "../middleware/imageUpload.js";

const router = express.Router()

router.put('/upload', store.single('image'), updateWithImage)
router.route('/').get( getContents).post(store.single('image'), createContent).put( updateContent).delete( deleteContent)
router.route('/content').get( getContent)

export default router