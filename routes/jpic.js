import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
// import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from 'crypto'
import path from "path";
// import gridfs from 'gridfs-stream';
import upload from "../middleware/upload.js";
import { createContent, deleteContent, getContent, getContents, sortContent, updateContent } from "../controller/jpicController.js";
import store from "../middleware/imageUpload.js";
// import uploadMiddleware from "../middleware/imageUpload.js";

const router = express.Router()

router.route('/').get(getContents).post(store.single('image'), createContent).put(updateContent).delete(deleteContent)
router.route('/content').get(getContent)
router.route('/content/sort').get(sortContent)

export default router