import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
// import gridfs from 'gridfs-stream';
import upload from "../middleware/upload.js";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/jpicController.js";

const router = express.Router()

router.route('/').get( getContents).post( createContent)
router.route('/content').get( getContent)
router.route('/content').put( updateContent).delete( deleteContent)
export default router