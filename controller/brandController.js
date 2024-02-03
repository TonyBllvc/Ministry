import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Brand from '../model/brandModel.js';
import Product from '../model/productModel.js';

const createBrand = asyncHandler(async (req, res) => {

    const { name, parentCategory } = req.body;
    // let emptyFields = []

    // if (!name) {
    //     emptyFields.push('No name allocated')
    // }
    // if (!parentCategory) {
    //     emptyFields.push('No category brand allocated')
    // }
    // if (emptyFields.length > 0) {
    //     return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    // }

    try {
        var brand = await Brand.create({
            name,
            category: parentCategory || undefined,
            // properties,
        });
        brand = await brand.populate('category', 'cat')

        res.status(201).json({ brand: brand, message: "Brand created Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const getBrands = asyncHandler(async (req, res) => {
    try {
        const brand = await Brand.find().populate('category');

        res.status(200).json({ brand });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// @desc    Fetch a particular Brand
// route    GETT /api/brand/:id
//@access   Public
const getBrand = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        const brand = await Brand.findById({ _id: id }).populate('category');

        if (!brand) {
            return res.status(400).json({ error: 'No such product' })
        }

        res.status(200).json({ brand });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
// @desc    Fetch a particular Brand
// route    POST /api/brand/category
//@access   Public
const getBrandsFromCategory = asyncHandler(async (req, res) => {

    const { category } = req.body

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: 'No such document' })
    // }

    try {
        const brand = await Brand.find({ category: category }).populate('category', 'cat');

        if (!brand) {
            return res.status(404).json({ error: 'No such product' })
        }

        res.status(200).json({ brand });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// @desc    Fetch a particular Brand
// route    POST /api/brand/categories
//@access   Public
const getBrandsFromCategies = asyncHandler(async (req, res) => {

    const { category } = req.body

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: 'No such document' })
    // }

    try {
        const brand = await Brand.find({ category: category }).populate('category', 'cat');

        if (!brand) {
            return res.status(404).json({ error: 'No such product' })
        }

        res.status(200).json({ brand });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


const updateBrand = asyncHandler(async (req, res) => {
    const { name, parentCategory } = req.body
    var brand = await Brand.findById(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'No such document' })
    }


    if (!mongoose.Types.ObjectId.isValid(req.body.parent)) {
        return res.status(404).json({ error: 'No category brand' })
    }

    if (!name) {
        return res.status(404).json({ error: 'Please fill in the name fields' })
    }

    try {
        // if (brand.images.length > 0) {
        brand.name = req.body.name || brand.name
        brand.category = req.body.parent || brand.parent
        brand.properties = req.body.properties || undefined
        // Save the updated brand to the database
        brand = await brand.save()
        brand = await brand.populate('category', 'cat  ')

        console.log("Update successful")
        res.status(201).json({ brand: brand, message: 'Brand updated successfully' })
        // res.status(201).json({
        //     _id: updated._id,
        //     name: updated.name,
        //     category: updated.category,
        //     images: updated.images,
        //     description: updated.description
        // })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


const deleteBrand = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    try {
        const brand = await Brand.findById(id);

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        const result = await Brand.findByIdAndDelete({ _id: id })

        if (!result) {
            return res.status(404).json({ error: 'No such brand' })
        }
        
        await Product.deleteMany({ brand_category: id })

        console.log('Brand deleted successfully');
        res.status(200).json({ brand: result, message: 'Brand deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

export {
    createBrand,
    getBrands,
    getBrand,
    getBrandsFromCategory,
    getBrandsFromCategies,
    updateBrand,
    deleteBrand
}