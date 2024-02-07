import express from "express";
// import multer from 'multer';
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from 'crypto'
import path from "path";
import gridfs from 'gridfs-stream';
import methodOverride from "method-override";
import Grid from "gridfs-stream";

const router = express.Router()

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/')

let gfs

// conn.once('open', () => {
//     const mongo = mongoose.mongo; // Retrieve the mongo property from mongoose
//     gfs = Grid(conn.db, mongo); // Provide mongo as the second argument
//     gfs.collection('images')
//     // gfs = new mongoose.mongo.GridFSBucket(conn.db), {
//     //     bucketName: 'images'
//     // }
// })

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db), {
        bucketName: 'images'
    }
})

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images',
                }
                resolve(fileInfo)
            })
        })
    }
})


const store = multer({
    storage,

    // limits: {
    //     fileSize: 20000000
    // },
    // fileFilter: function (req, file, cb) {
    //     checkFileTypes(file, cb)
    // }
})

// function checkFileTypes(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)
//     if (mimetype && extname) {
//         return cb(null, true)
//     }
//     cb('filetype')
// }

router.route('/upload').post(store.single('image'), async (req, res) => {
    const { file } = req
    res.json({ file: file })
    // const { _id } = file
    // if (file.size > 5000000) {
    //     deleteImage(_id)
    //     return res.status(400).send('file not exceeding 5mb')
    // }

    // console.log('uploaded file', file)
    // return res.send(file._id)
})


export default router