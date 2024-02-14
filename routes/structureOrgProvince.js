import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/structuralOrgProvinceController.js";
import store from "../middleware/imageUpload.js";

const router = express.Router()

router.route('/').get(getContents).post(store.single('image'), createContent).put(updateContent).delete(deleteContent)
router.route('/content').get(getContent)

export default router