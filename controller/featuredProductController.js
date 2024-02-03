import asyncHandler from 'express-async-handler'
import FeaturedProduct from "../model/featuredProductModel.js"

// @desc    Create products
// route    POST /api/featured/
//@access   Public
const createFeaturedProduct = asyncHandler(async (req, res) => {
    const { prodId } = req.body

    try {
        await FeaturedProduct.deleteMany({})

        var createProduct = new FeaturedProduct({
            _id: prodId,
            prodId: prodId
        })

        await createProduct.save()
        console.log("Done")
        res.status(201).json({ message: "Featured Product saved Successfully" })
    } catch (error) {
        console.log("Not Done")
        res.status(400).json({ error: error.message })
    }

});

// @desc    Fetch products
// route    GET /api/featured/
//@access   Public
const getFeaturedProduct = asyncHandler(async (req, res) => {
    try {
        const prodId = await FeaturedProduct.find()
        console.log("Done")
        res.status(200).json({ Id: prodId })
    } catch {
        console.log("Not Done")
        res.status(400).json({ error: error.message })
    }
})


export {
    createFeaturedProduct,
    getFeaturedProduct
}