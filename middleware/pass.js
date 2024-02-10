import express from "express";
import mongoose from 'mongoose';
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from 'crypto'
import path from "path";
import gridfs from 'gridfs-stream';
import methodOverride from "method-override";
import Grid from "gridfs-stream";

// const router = express.Router()

// Not in use
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/')
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('passed first')

// conn.once('open', () => {
//     const mongo = mongoose.mongo; // Retrieve the mongo property from mongoose
//     gfs = Grid(conn.db, mongo); // Provide mongo as the second argument
//     gfs.collection('images')
//     // gfs = new mongoose.mongo.GridFSBucket(conn.db), {
//     //     bucketName: 'images'
//     // }
// })

let gfs;

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db), {
        bucketName: 'images'
    }
})

console.log('passed second')
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

console.log('passed third')

function checkFileTypes(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    }
    cb('filetype')
}
console.log('passed fourth')

const store = multer({
    storage,
    limits: {
        fileSize: 20000000
    },
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})

console.log('passed fifth')

export default store