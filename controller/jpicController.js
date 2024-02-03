import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import multer from "multer";
import path from "path"; import Jpic from "../model/jpicModel.js";
;

// @desc    Fetch Contents
// route    GET /api/content/
//@access   Public
const getContents = asyncHandler(async (req, res) => {

    try {
        let content = await Jpic.find()
        if (content.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


// @desc    Fetch single Content
// route    GET /api/content/
//@access   Public
const getContent = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        var content = await Jpic.findById({ _id: id })

        if (!content) {
            return res.status(400).json({ error: "No such content" })
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// @desc    Sort Contents by id
// route    GETT/api/content/sort
//@access   Public
const sortContent = asyncHandler(async (req, res) => {

    try {
        var content = await Jpic.find().sort(-1)

        if (!content) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// @desc    Create content
// route    POST /api/content/
//@access   Public
const createContent = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    try {
        var createContent = new Jpic({
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
const updateContent = asyncHandler(async (req, res) => {
    var content = await Jpic.findById(req.params.id)

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


const deleteContent = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        const content = await Content.findById(id);

        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }

        // Delete the associated image files from the server
        if (content.images) {
            const imagePaths = content.images.split(",");
            // Loop through the image paths and delete the corresponding files
            imagePaths.forEach((imagePath) => {
                const imagePathOnServer = `backend/assets/${path.basename(imagePath)}`;
                fs.unlinkSync(imagePathOnServer); // Delete the image file from the server
            })
        }

        const result = await Content.findByIdAndDelete({ _id: id })

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

const getContentsByCategory = async (req, res) => {
    try {
        const content = await Content.aggregate([
            {
                $lookup: {
                    from: Brand, // Update with the actual name of your table collection
                    localField: 'brand_category',
                    foreignField: '_id',
                    as: 'table',
                },
            },
            {
                $unwind: '$table',
            },
            {
                $lookup: {
                    from: Category, // Update with the actual name of your category collection
                    localField: 'table.category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $sort: {
                    'category.cat': 1, // Sorting by category name in ascending order
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    price: 1,
                    images: 1,
                    brand_category: 1,
                    category: '$category.cat',
                    properties: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        res.status(200).json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export {
    getContents,
    getContent,
    getContentForCategories,
    getContentForCategoryBrand,
    getContentForBrands,
    getContentForCart,
    getContentForWishlist,
    sortContent,
    createContent,
    updateContent,
    deleteContent,
    getContentsByCategory
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
