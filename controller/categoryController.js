import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Category from '../model/categoryModel.js';


const createCategory = asyncHandler(async (req, res) => {
    const { cat } = req.body;

    const catExists = await Category.findOne({ cat })

    if (catExists) {
        return res.status(400).json({ error: ' Cat already exists, and can not be replicated' })
    }

    try {
        var category = await Category.create({
            cat,
            // properties,
        });

        res.status(201).json({ category: category, message: "Category created Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


const getCategories = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find()

        if (!category) {
            return res.status(400).json({ error: "No such category" })
        }

        res.status(200).json({ category });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const getCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.find({ cat: req.body.cateTitle })

        if (!category) {
            return res.status(400).json({ error: "No such category" })
        }

        res.status(200).json({ category });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


export {
    createCategory,
    getCategories,
    getCategory
}