import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import Support from "../model/supportModel.js";
import moment from "moment";

// @desc    Fetch Contents
// route    GET /api
//@access   Public
const getContents = asyncHandler(async (req, res) => {

    try {
        let content = await Support.find()
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
// route    GET /api/content/
//@access   Public
const getContent = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        var content = await Support.findById({ _id: id })

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
        var content = await Support.find().sort(-1)

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

    try {
        var createContent = new Support({
            title,
            content
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
const updateContent = asyncHandler(async (req, res) => {
    var content = await Support.findById(req.body.id)

    if (!content) {
        return res.status(404).json({ error: "Content not found" });
    }

    try {
        content.title = req.body.title || content.title
        content.content = req.body.content || content.content

        await content.save();



        res.status(201).json({ content: content, message: "Content updated successfully" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// @desc    Create content
// route    DELETE /api/content/:id
//@access   Public
const deleteContent = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        const content = await Support.findById(id);

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        const result = await Support.findByIdAndDelete({ _id: id })

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
    deleteContent,
}
