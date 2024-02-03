import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import { createProduct, deleteProduct, getProduct, getProductForCategories, getProductForBrands,getProducts, sortProduct, updateProduct, getProductsByCategory, getProductForCategoryBrand } from "../controller/productController.js"; import mongoose from 'mongoose';
// import gridfs from 'gridfs-stream';
import upload from "../middleware/upload.js";
// import path from 'path';
import multer from 'multer';
// import { GridFsStorage } from "multer-gridfs-storage"

const router = express.Router()

// const mongouri = 'mongodb://127.0.0.1:27017/images';

// Create a GridFSStorage instance
// const storage = new GridFsStorage({
//     url: mongouri,
//     file: (req, file) => {
//         return {
//             bucketName: 'images', // Set the bucket name
//         };
//     },
// });

// const upload = multer({ storage });

// images is gotten from the field passed in the frontend
// upload.array('images', 6),
// router.route('/').get(protect, getProducts).post(protect, upload.single('images'), createProduct).put(protect, updateProduct)
router.route('/').get(protect, getProducts).post(protect, upload.array('images', 6), createProduct)
router.route('/category/brand').post(protect, getProductForCategoryBrand)
router.route('/category').post(protect, getProductForCategories)
router.route('/brands').post(protect, getProductForBrands)
router.route('/sort').get(protect, sortProduct)
router.route('/:id').put(protect, upload.array('images', 6), updateProduct).get(protect, getProduct).delete(protect, deleteProduct)

router.route('/sor').get(protect, getProductsByCategory)
// no longer neccessary
// Add a new route to serve images
// router.route('/images/:imageFilename').get(protect, (req, res) => {
//     const imageFilename = req.params.imageFilename;
//     const imagePath = path.join(__dirname, '../assets', imageFilename);

//     res.sendFile(imagePath);
//   });


// Route for downloading a file
// router.get('/download/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         if (!file || file.length === 0) {
//             return res.status(404).json({ error: 'No file found' });
//         }

//         const readstream = gfs.createReadStream(file.filename);
//         readstream.pipe(res);
//     });
// });

export default router