import express from "express";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/formationController.js";

const router = express.Router()

router.route('/').get( getContents).post( createContent).put( updateContent).delete( deleteContent)
router.route('/content').get( getContent)

export default router