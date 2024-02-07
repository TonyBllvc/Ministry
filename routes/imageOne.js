import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
import multer from "multer";
import crypto from 'crypto'
import path from "path";
import gridfs from 'gridfs-stream';
import { grid } from "../middleware/imageOne.js";

const router = express.Router()

// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true
// })

// let gfs
// conn.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(conn.db), {
//         bucketName: 'images'
//     }
// })

// const storage = new GridFsStorage({
//     url: 'mongodb://127.0.0.1:27017/',
//     options: {
//         // useUnifiedTopology: true
//     },
//     file: (req, file) => {
//                 return {
//                     filename: file.originalname,
//                     bucketName: 'images',
//                 }
//         }
// })

// const store = multer({
//     storage,
//     limits: {
//         fileSize: 20000000
//     },
//     fileFilter: function (req, file, cb) {
//         checkFileTypes(file, cb)
//     }
// })

// function checkFileTypes(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)
//     if (mimetype && extname) {
//         return cb(null, true)
//     }
//     cb('filetype')
// }

// const uploadMiddleware = (req, res, next) => {
//     const upload = store.single('image')
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).send('file too large')
//         } else if (err) {
//             if (err === 'filetype') {
//                 return res.status(400).send('Image files only')
//             }
//             return res.sendStatus(500)
//         }
//         next()
//     })
// }
router.route('/upload').post(grid().single('image'), async (req, res) => {
    try {
        res.status(200).json('uploaded successfully')
    } catch (error) {
        res.status(404).send(error.message || error.error)
    }
    // const { file } = req
    // const { _id } = file
    // if (file.size > 5000000) {
    //     deleteImage(_id)
    //     return res.status(400).send('file not exceeding 5mb')
    // }

    // console.log('uploaded file', file)
    // return res.send(file._id)
})

export default router