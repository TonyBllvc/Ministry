import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/personnelExtraController.js";
import store from "../middleware/imageUpload.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

// router.use(protect)
router.route('/').get( getContents).post(protect, createContent).put( protect, updateContent).delete( protect, deleteContent)
router.route('/content').get( getContent)

export default router