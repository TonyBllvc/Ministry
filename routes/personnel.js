import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
// import gridfs from 'gridfs-stream';
import upload from "../middleware/upload.js";
import { createContent, deleteContent, getContent, getContents, updateContent } from "../controller/personnelController.js";

const router = express.Router()

// router.use(protect)
router.route('/').get( getContents).post(protect, createContent).put(protect, updateContent).delete(protect, deleteContent)
router.route('/content').get( getContent)

export default router