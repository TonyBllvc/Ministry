import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import SpiritualMS from "../model/spiritualModel.js";

// @desc    Fetch Contents
// route    GET /api
//@access   Public
const getContents = asyncHandler(async (req, res) => {

    try {
        let content = await SpiritualMS.find()
        if (content.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ content });
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
        var content = await SpiritualMS.findById({ _id: id })

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
        var content = await SpiritualMS.find().sort(-1)

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
        var createContent = new SpiritualMS({
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
    var content = await SpiritualMS.findById(req.body.id)

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
// route    DELETE /api/content/
//@access   Public
const deleteContent = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        const content = await SpiritualMS.findById(id);

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        const result = await SpiritualMS.findByIdAndDelete({ _id: id })

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

