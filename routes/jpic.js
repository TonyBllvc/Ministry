import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js"; 
import mongoose from 'mongoose';
// import gridfs from 'gridfs-stream';
import upload from "../middleware/upload.js";

const router = express.Router()

router.route('/').get(protect).post(protect)
export default router