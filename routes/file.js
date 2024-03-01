import express from "express";
import { protect } from "../middleware/authentication.js";


// const upload = multer({ storage: storage });

const router = express.Router();

// router.use(protect)
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