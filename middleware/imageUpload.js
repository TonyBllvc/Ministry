import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
import multer from "multer";
import { v4 as primaryKey } from 'uuid';
import crypto from 'crypto'
import path from "path";
// import gridfs, { Grid } from 'gridfs-stream';
import { MongoClient } from "mongodb";
import Grid from 'gridfs-stream';

let gfs
const conn = mongoose.createConnection('mongodb+srv://bllvcjboi:TinJBllvckq@cluster0.sbsoszl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})

conn.once('open', () => {
    const mongo = mongoose.mongo; // Retrieve the mongo property from mongoose
    gfs = Grid(conn.db, mongo); // Provide mongo as the second argument
    gfs.collection('images')
    console.log('connection')
})

// export function grid() {
const storage = new GridFsStorage({
    // db: promise,
    url: 'mongodb+srv://bllvcjboi:TinJBllvckq@cluster0.sbsoszl.mongodb.net/?retryWrites=true&w=majority',
    cache: true,
    options: {
        // useUnifiedTopology: true
    },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const id = primaryKey();
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images',
                    // metadata: {
                    //     id: id, // Trường để lưu _id của tệp tin
                    // },
                }
                console.log(file.f, 'ss');

                resolve(fileInfo)
            })
        })
    }
})

 const store = multer({
    storage: storage,
    limits: {
        fileSize: 200000000
    },
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})

function checkFileTypes(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    }
    cb('filetype')
}

export default store
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

// export default uploadMiddleware 