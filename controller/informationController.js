import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import Information from "../model/informationModel.js";
import moment from "moment";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";

const url = 'mongodb+srv://bllvcjboi:TinJBllvckq@cluster0.sbsoszl.mongodb.net/?retryWrites=true&w=majority'
// const baseUrl = ' http://localhost:4242/api/image/upload/'


// @desc    Fetch Contents
// route    GET /api
//@access   Public
const getContents = asyncHandler(async (req, res) => {


    try {
        let content = await Information.find()
        if (content.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        // Find the latest update time by comparing createdAt and updatedAt
        let latestUpdateTime = content.reduce((latest, item) => {
            const itemUpdateTime = item.updatedAt > item.createdAt ? item.updatedAt : item.createdAt;
            return itemUpdateTime > latest ? itemUpdateTime : latest;
        }, content[0].createdAt); // Initialize with the first item's createdAt timestamp

        // Format the latest update time as desired (e.g., using Moment.js)    
        // Format the latest update time as how long ago it was edited using Moment.js
        latestUpdateTime = moment(latestUpdateTime).fromNow(); // Example format: "a few seconds ago", "2 days ago", etc.

        res.status(200).json({ data: content, latestUpdateTime });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


// @desc    Fetch single Content
// route    POST /api/content/
//@access   Public
const getContent = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        var content = await Information.findById({ _id: id })

        if (!content) {
            return res.status(400).json({ error: "No such content" })
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Not acive
// @desc    Sort Contents by id
// route    GETT/api/content/sort
//@access   Public
const sortContent = asyncHandler(async (req, res) => {

    try {
        var content = await Information.find().sort(-1)

        if (!content) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// @desc    Create content
// route    POST /api
//@access   Public
const createContent = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const { file } = req

    try {
        if (!file) {
            throw new Error('Field name "image" missing in form data');
        }

        var createContent = new Information({
            title,
            content,
            id: file.id,
            images: file.filename
        })

        var singleContent = await createContent.save()

        res.status(201).json({ table: singleContent, message: "Content created Successfully" })
    } catch {
        console.log("Not Done")
        res.status(400).json({ error: error.message })
    }

});

// @desc    Create content
// route    PATCH /api/content/:id
//@access   Public
// access   Public
const updateContent = asyncHandler(async (req, res) => {

    // const { title, Id, content, id } = req.body

    const contents = await Information.findById(req.body.id)

    if (!contents) {
        return res.status(404).json({ error: "Content not found" });
    }

    try {

        //     //     // Find the existing file document
        //     //     // const existingFile = await bucket.find({ _id: new ObjectId(req.body.id) }).toArray();
        contents.title = req.body.title || contents.title
        contents.content = req.body.content || contents.content

        await contents.save();



        res.status(201).json({ content: contents, message: "Content updated successfully" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// @desc    Handle Image independently
// route    POST /api
//@access   Public
const updateWithImage = asyncHandler(async (req, res) => {
    // const { title, content } = req.body
    const { file } = req
    // console.log(req.body.title)
    // console.log('stage 1')
    const mongoClient = new MongoClient(url);
    await mongoClient.connect();

    // console.log('stage 2')
    const database = mongoClient.db('test'); // Adjust database name if needed
    const bucket = new GridFSBucket(database, { bucketName: 'images' });

    // console.log('stage 3')
    try {
        console.log(req.body.title)
        if (!file) {
            throw new Error('Field name "image" missing in form data');
        }
        // console.log('stage 1b')

        // await bucket.delete(data.id);
        await bucket.delete(new ObjectId(req.body.Id));

        // console.log('stage 1c')
        const contents = await Information.findById(req.body.id)

        // console.log('stage d')
        if (!contents) {
            // console.log('stage er')
            return res.status(404).json({ error: "Content not found" });
        }
        // console.log('stage 2a')

        contents.title = req.body.title || contents.title
        contents.content = req.body.content || contents.content
        contents.id = file.id
        contents.images = file.filename

        // console.log('stage 2b')
        await contents.save()
        // await contents.save()

        // console.log('stage 3')
        res.status(201).json({ table: contents, message: "Content created Successfully" })
    } catch {
        console.log("Not Done")
        res.status(400).json({ error: error.message })
    }

});

// const updateContent = asyncHandler(async (req, res) => {

//     const { title, id, content } = req.body

//     // console.log(req.params.os)
//     var contents = await Information.findById(req.body._id)
//     // console.log(req.body.title)
//     if (!content) {
//         return res.status(404).json({ error: "Content not found" });
//     }

//     try {
//         if (req.file) {

//             const mongoClient = new MongoClient(url);
//             await mongoClient.connect();

//             const database = mongoClient.db('test'); // Adjust database name if needed
//             const bucket = new GridFSBucket(database, { bucketName: 'images' });

//             //     // return res.status(404).json({ message: "File not found" });
//             // }
//             // Find the existing file document
//             const exist = Information.find({ images: req.body._images })
//             const existingFile = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
//             if (!exist) {
//                 // if we changed image, work with this logic instead
//                 return res.status(404).json({ message: "File not found" });
//             }

//             // if (!req.file) {
//             //     return res.status(404).json({ message: "File not found" });
//         }
//         contents.title = req.body.title || contents.title
//         contents.content = req.body.content || contents.content

//         // await contents.save();



//         res.status(201).json({ message: "Content updated successfully" })
//         // res.status(201).json({ content: contents, message: "Content updated successfully" })

//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// })

// @desc    Create content
// route    DELETE /api/content/
//@access   Public
const deleteContent = asyncHandler(async (req, res) => {

    const { id, Id } = req.body

    const mongoClient = new MongoClient(url);
    await mongoClient.connect();

    const database = mongoClient.db('test'); // Adjust database name if needed
    const bucket = new GridFSBucket(database, { bucketName: 'images' });

    // console.log(id + " " + Id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {

        // console.log(id + " " + Id)

        const content = await Information.findById(id);

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        await bucket.delete(new ObjectId(Id));

        const result = await Information.findByIdAndDelete({ _id: id })

        if (!result) {
            return res.status(404).json({ error: "No such content" })
        }

        console.log("Content deleted successfully");
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})
export {
    getContents,
    getContent,
    sortContent,
    createContent,
    updateContent,
    updateWithImage,
    deleteContent,
}



// const deleteContent = asyncHandler(async (req, res) => {

//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such document" })
//     }

//     const result = await Content.findByIdAndDelete({ _id: id })

//     if (!result) {
//         return res.status(400).json({ error: "No such result" })
//     }

//     res.status(200).json({ message: "Deleted successfully!" })
// })

// Similar o what you just did here, I also need to be able to update the images not just in the databae, but also in my multer file where it is saved, removing the previous images and adding the updated ones. Show me the code in details as well.
