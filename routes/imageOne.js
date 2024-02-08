import express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import { protect } from "../middleware/authentication.js";
import mongoose from 'mongoose';
import multer from "multer";
import crypto from 'crypto'
import path from "path";
import Grid from 'gridfs-stream';
import { gfs, store } from "../middleware/imageOne.js";
import Image from "../model/image.js";

const router = express.Router()

// let gfs
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/', {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true
// })

// conn.once('open', () => {
//     const mongo = mongoose.mongo; // Retrieve the mongo property from mongoose
//     gfs = Grid(conn.db, mongo); // Provide mongo as the second argument
//     gfs.collection('images')
//     console.log('connection')
//     // gfs = new mongoose.mongo.GridFSBucket(conn.db), {
//     //     bucketName: 'images'
//     // }
// })
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
router.route('/upload').post(store.single('image'), async (req, res) => {
    try {
        const { file } = req

        // console.log(file.image)
        // console.log(file)

        var cet = new Image({
            _id: file.id,
            images: file.filename
        })

        await cet.save()
        res.status(200).json({ data: file, meta: file.filename, message: 'uploaded successfully' })
        // .redirect('/spiritual')
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
}).get(async (req, res) => {
    console.log('call')
    try {
        let gft

        const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        })

        conn.once('open', () => {
            const mongo = mongoose.mongo; // Retrieve the mongo property from mongoose
            gft = Grid(conn.db, mongo); // Provide mongo as the second argument
            gft.collection('images.files')
            console.log('connection')
            // gfs = new mongoose.mongo.GridFSBucket(conn.db), {
            //     bucketName: 'images'
            // }
        })
        // Ensure that gft is initialized before using it
        if (!gft) {
            return res.status(500).json({ error: 'GridFS not initialized' });
        }
        
        // const image = Image.find 
        const image = gft.find()

        if ((await image.count()) == 0) {
            return res.status(500).json({ error: 'No files found' })
        }

        let fileInfo = []
        await image.forEach((doc) => {
            fileInfo.push({
                name: doc.filename,
                url: baseUrl + doc.filename
            })
        })

        return res.status(200).json({ data: fileInfo, message: 'exist' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    // const image = gft.files.find()
    // console.log(image)
    // .toArray((err, files) => {
    //     // Check if files exist
    //     console.log('again')
    //     if (!files || files.length == 0) {
    //         console.log('once')
    //         return res.status(404).json({ error: "No files found" })
    //     }
    //     console.log('and again')

    //     res.status(200).json({ data: file, message: 'exist' })
    // })
})

export default router