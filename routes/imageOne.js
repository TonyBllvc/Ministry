import express from "express";
// import { GridFsStorage } from "multer-gridfs-storage";
// import { protect } from "../middleware/authentication.js";
// import mongoose from 'mongoose';
// import multer from "multer";
// import crypto from 'crypto'
// import path from "path";
// import Grid from 'gridfs-stream';
// import uploadMiddleware from "../middleware/imageOne.js";
// import Image from "../model/image.js";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";
// import { updateStore } from "../middleware/imageTwo.js";

const router = express.Router()
const url = 'mongodb+srv://bllvcjboi:TinJBllvckq@cluster0.sbsoszl.mongodb.net/?retryWrites=true&w=majority'
const baseUrl = 'https://spiritan.vercel.app/api/image/upload/'

// router.route('/upload').post(store.single('image'), async (req, res) => {
// router.route('/upload').post(uploadMiddleware, async (req, res) => {
//     try {
//         const { file } = req

//         // console.log(file.image)
//         // console.log(file)

//         var cet = new Image({
//             _id: file.id,
//             images: file.filename
//         })

//         await cet.save()
//         res.status(200).json({ data: file, meta: file.filename, message: 'uploaded successfully' })
//         // .redirect('/spiritual')
//     } catch (error) {
//         res.status(404).send(error.message || error.error)
//     }
//     // const { file } = req
//     // const { _id } = file
//     // if (file.size > 5000000) {
//     //     deleteImage(_id)
//     //     return res.status(400).send('file not exceeding 5mb')
//     // }

//     // console.log('uploaded file', file)
//     // return res.send(file._id)
// }).get(async (req, res) => {
//     console.log('call')
//     try {
//         const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         await mongoClient.connect();
//         console.log('1')

//         const database = mongoClient.db('test');
//         const images = database.collection('images.files');

//         console.log('2')
//         // Ensure that gft is initialized before using it
//         if (!images) {
//             return res.status(500).json({ error: 'GridFS not initialized' });
//         }

//         console.log('3')
//         // const image = Image.find 
//         const cursor = images.find({})


//         console.log('5')

//         // Use collection.estimatedDocumentCount for approximate count
//         const estimatedCount = await images.estimatedDocumentCount();
//         if (estimatedCount === 0) {
//             return res.status(404).json({ error: 'No files found' });
//         }

//         console.log('6')

//         let fileInfo = []
//         await cursor.forEach((doc) => {
//             fileInfo.push({
//                 name: doc.filename,
//                 url: baseUrl + doc.filename
//             })
//         })

//         return res.status(200).json({ data: fileInfo })
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
//     // const image = gft.files.find()
//     // console.log(image)
//     // .toArray((err, files) => {
//     //     // Check if files exist
//     //     console.log('again')
//     //     if (!files || files.length == 0) {
//     //         console.log('once')
//     //         return res.status(404).json({ error: "No files found" })
//     //     }
//     //     console.log('and again')

//     //     res.status(200).json({ data: file, message: 'exist' })
//     // })
// })

// Very active for fetching images
router.route('/upload/:name').get(async (req, res) => {
    console.log('call')
    try {
        const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

// router.route('/upload/:id').put(store.single('image'), async (req, res) => {
// router.route('/upload/:id').put(uploadMiddleware, async (req, res) => {
//     try {
//         const mongoClient = new MongoClient(url);
//         await mongoClient.connect();
//         console.log('step 1')
//         const database = mongoClient.db('test'); // Adjust database name if needed
//         const bucket = new GridFSBucket(database, { bucketName: 'images' });
//         console.log('step 2')


//         // Upload new file (handling errors and asynchronous actions)
//         try {
//             // Find the existing file document
//             const existingFile = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
//             const imageDir = await Image.findById(req.params.id)


//             const { file } = req

//             console.log(existingFile)
//             console.log(imageDir)
            
//             // console.log(file.filename)
//             // console.log(file)
//             // if (imageDir && existingFile.length) {
//             //     console.log('exists')
//             //     await bucket.delete(new ObjectId(req.params.id));

//             //     await Image.findByIdAndDelete(req.params.id)
//             //     // const { file } = req

//             //     imageDir._id = new Object(file.id) || imageDir._id
//             //     imageDir.images = file.filename || imageDir.image

//             //     await imageDir.save()

//             //     console.log('success')
//             //     return res.status(200).json({ message: "File updated successfully" });
//             // }

//             // if (!imageDir && existingFile.length) {
//             //     console.log('step p')
//             //     await bucket.delete(new ObjectId(req.params.id));

//             //     var cet = new Image({
//             //         _id: file.id,
//             //         images: file.filename
//             //     })

//             //     await cet.save()

//             //     console.log('push')
//             //     return res.status(200).json({ message: "File updated successfully" });
//             // }

//             // console.log('step 3')
//             // var cet = new Image({
//             //     _id: file.id,
//             //     images: file.filename
//             // })

//             // await cet.save()

//             return res.status(200).json({ message: "File updated successfully" });
//             // console.log('step 3')
//             // console.log(existingFile.length)
//             // console.log(existingFile)

//             // console.log('step x')


//             // var cet = new Image({
//             //     _id: file.id,
//             //     images: file.filename
//             // })


//             // if (existingFile.length > 0) {
//             //     const writeStream = bucket.openUploadStream(existingFile[0].filename);
//             //     newFile.stream.pipe(writeStream);

//             //     console.log('step 4')
//             //     await newFile.stream.on('end', async () => {
//             //         try {
//             //             await bucket.delete(existingFile[0]._id); // Delete old file with error handling

//             //             console.log('Step 5: Deleted old file');
//             //             res.status(200).json({ message: "File updated successfully" });

//             //         } catch (deleteError) {
//             //             console.error('Error deleting old file:', deleteError);
//             //             res.status(500).json({ message: "Error updating file" });
//             //         }
//             //     });
//             // } else {
//             //     console.error('No new file uploaded');
//             //     res.status(400).json({ message: "No new file received" });
//             // }
//         } catch (uploadError) {
//             console.error('Error uploading new file:', uploadError);
//             res.status(500).json({ message: "Error updating file" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.route('/upload/:id').delete(async (req, res) => {
//     try {
//         const mongoClient = new MongoClient(url);
//         await mongoClient.connect();

//         const database = mongoClient.db('test'); // Adjust database name if needed
//         const bucket = new GridFSBucket(database, {
//             bucketName: 'images'
//         });

//         const imageCheck = await Image.findById(req.params.id)

//         if (!imageCheck) {
//             return res.status(404).json({ error: "Content not found" });
//         }

//         await bucket.delete(new ObjectId(req.params.id));

//         await Image.findByIdAndDelete({ _id: req.params.id })

//         res.status(200).json({ message: "File deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


export default router


// Look at this code later --  it is for update

// ***************************** starts ********************************************
// router.route('/upload/:id').put(async (req, res) => {
//     try {
//         const mongoClient = new MongoClient(url);
//         await mongoClient.connect();
//         console.log('step 1')
//         const database = mongoClient.db('test'); // Adjust database name if needed
//         const bucket = new GridFSBucket(database, { bucketName: 'images' });
//         console.log('step 2')

//         // Find the existing file document
//         const existingFile = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
//         if (!existingFile.length) {
//             return res.status(404).json({ message: "File not found" });
//         }
//         console.log('step 3')
//         console.log(existingFile.length)
//         console.log(existingFile)

//         // Upload new file (handling errors and asynchronous actions)
//         try {
//             // Overwrite the existing file with the new one
//             const newFile = updateStore.single('image')(req, res);
//             console.log('step x')
//             console.log(newFile)

//             if (existingFile.length > 0) {
//                 const writeStream = bucket.openUploadStream(existingFile[0].filename);
//                 newFile.stream.pipe(writeStream);

//                 console.log('step 4')
//                 await newFile.stream.on('end', async () => {
//                     try {
//                         await bucket.delete(existingFile[0]._id); // Delete old file with error handling

//                         console.log('Step 5: Deleted old file');
//                         res.status(200).json({ message: "File updated successfully" });

//                     } catch (deleteError) {
//                         console.error('Error deleting old file:', deleteError);
//                         res.status(500).json({ message: "Error updating file" });
//                     }
//                 });
//             } else {
//                 console.error('No new file uploaded');
//                 res.status(400).json({ message: "No new file received" });
//             }
//         } catch (uploadError) {
//             console.error('Error uploading new file:', uploadError);
//             res.status(500).json({ message: "Error updating file" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// ***************************** ends ********************************************


