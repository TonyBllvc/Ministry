import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
import multer from "multer";
import crypto from 'crypto'
import path from "path";
import gridfs from 'gridfs-stream';


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

export function grid() {
    const storage = new GridFsStorage({
        url: 'mongodb://127.0.0.1:27017/',
        options: {
            // useUnifiedTopology: true
        },
        file: (req, file) => {
            return {
                filename: file.originalname,
                bucketName: 'images',
            }
        }
    })

    const store = multer({
        storage: storage,
        // limits: {
        //     fileSize: 20000000
        // },
        // fileFilter: function (req, file, cb) {
        //     checkFileTypes(file, cb)
        // }
    })

    return store;
}
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