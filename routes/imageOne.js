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
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";

const router = express.Router()

const baseUrl = ' http://localhost:4242/api/image/upload/'
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
        const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        console.log('1')

        const database = mongoClient.db('test');
        const images = database.collection('images.files');

        console.log('2')
        // Ensure that gft is initialized before using it
        if (!images) {
            return res.status(500).json({ error: 'GridFS not initialized' });
        }

        console.log('3')
        // const image = Image.find 
        const cursor = images.find({})


        console.log('5')

        // Use collection.estimatedDocumentCount for approximate count
        const estimatedCount = await images.estimatedDocumentCount();
        if (estimatedCount === 0) {
            return res.status(404).json({ error: 'No files found' });
        }

        console.log('6')

        let fileInfo = []
        await cursor.forEach((doc) => {
            fileInfo.push({
                name: doc.filename,
                url: baseUrl + doc.filename
            })
        })

        return res.status(200).json({ data: fileInfo })
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

router.route('/upload/:name').get(async (req, res) => {
    console.log('call')
    try {
        const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();

        const database = mongoClient.db('test');
        const bucket = new GridFSBucket(database, {
            bucketName: 'images'
        })
        // const images = database.collection('images.files');

        console.log('2')
        let downloadStream = bucket.openDownloadStreamByName(req.params.name);
        // // Ensure that gft is initialized before using it
        // if (!images) {
        //     return res.status(500).json({ error: 'GridFS not initialized' });
        // }

        console.log('3')

        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });

        downloadStream.on("error", function (err) {
            return res.status(404).send({ message: "Cannot download the Image!" });
        });

        downloadStream.on("end", () => {
            return res.end();
        });

        // return res.status(200).json({ data: fileInfo})
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

router.route('/upload/:id').delete(async (req, res) => {
    try {
        const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');
        await mongoClient.connect();

        const database = mongoClient.db('test'); // Adjust database name if needed
        const bucket = new GridFSBucket(database, {
            bucketName: 'images'
        });

        const imageCheck = await Image.findById(req.params.id)

        if (!imageCheck) {
            return res.status(404).json({ error: "Content not found" });
        }
        
        await bucket.delete(new ObjectId(req.params.id));

        await Image.findByIdAndDelete({ _id: req.params.id })
        
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router