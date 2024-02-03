import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/apostolateController.js";

const router = express.Router()

router.route('/').get( getContents).post( createContent)
router.route('/content').get( getContent)
router.route('/content').put( updateContent).delete( deleteContent)
export default router