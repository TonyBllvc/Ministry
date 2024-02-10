import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/spiritualMSController.js";
import store from "../middleware/imageUpload.js";

const router = express.Router()

router.route('/').get( getContents).post(store.single('image'), createContent).put( updateContent).delete( deleteContent)
router.route('/content').post( getContent)

export default router