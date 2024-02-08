import express from "express";
import { protect } from "../middleware/authentication.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";


// const upload = multer({ storage: storage });

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