import express from "express";
import { protect } from "../middleware/authentication.js";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import gridfs from "gridfs-stream";
import methodOverride from "method-override";
import Grid from "gridfs-stream";

// Not in use
let gfs;

const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/");

const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "images",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route("/upload").post(upload.single("image"), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(500).send("Error uploading file.");
    }
    console.log("passed sixth");
    console.log("uploaded file", req.file);
    res.send("File uploaded successfully.");
});

export default router;