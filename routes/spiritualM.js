import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/spiritualMSController.js";

const router = express.Router()

router.route('/').get( getContents).post( createContent).put( updateContent).delete( deleteContent)
router.route('/content').post( getContent)

export default router