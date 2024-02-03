import asyncHandler from "express-async-handler"
import Product from "../model/productModel.js"
import mongoose from "mongoose"
import multer from "multer";
import path from "path";
import fs from "fs"; // Import the "fs" module for file operations
import Category from "../model/categoryModel.js";
import Brand from "../model/brandModel.js";
import { filterAll, filterProperties, filterPropertiesAndSort, filterSearch, filterSearchAndProperties, filterSearchAndSort, filterSort, } from "../utils/filterSearch.js";

// @desc    Fetch Products
// route    GETT /api/products/
//@access   Public
const getProducts = asyncHandler(async (req, res) => {

    try {
        let products = await Product.find().populate("brand_category", "name category")
        products = await Category.populate(products, {
            path: "brand_category.category",
            select: "cat"
        })
        // const products = await Product.find().populate("category", "cat")
        if (products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        res.status(200).json({ products });
        // // Retrieve all products from the database
        // const products = await Product.find({}, "images");

        // // Extract and concatenate all image paths from the products
        // const allImagePaths = products.reduce((imagePaths, product) => {
        //     if (product.images) {
        //         const productImagePaths = product.images.split(","); // Assuming images are stored as a comma-separated string
        //         imagePaths.push(...productImagePaths);
        //     }
        //     return imagePaths;
        // }, []);

        // // Return all image paths to the frontend
        // res.status(200).json({ images: allImagePaths });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


// @desc    Fetch Product
// route    GETT /api/products/
//@access   Public
const getProduct = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        var product = await Product.findById({ _id: id }).populate("brand_category", "name category")
        product = await Category.populate(product, {
            path: "brand_category.category",
            select: "cat"
        })
        if (!product) {
            return res.status(400).json({ error: "No such product" })
        }
        // Retrieve the image paths associated with the product
        // const imagePaths = product.images.split(","); // Assuming images are stored as a comma-separated string

        // Return the image paths to the frontend
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// @desc    Fetch Products for client page for partivular categories search
// route    POST /api/products/category/brand
//@access   Public
const getProductForCategoryBrand = asyncHandler(async (req, res) => {
    const { search, title, description, price, brand_category, item, sort } = req.body
    // const { selected, sort } = req.body;
    if (brand_category && item && !search && !sort) {
        console.log('correct one')
        // return res.status(200).json({ message: "Correct one" });
        return filterProperties(brand_category, item, req, res)
    } else if (brand_category && sort && !search && !item) {
        console.log('correct two')
        // return res.status(200).json({ message: "Correct two" });
        return filterSort(brand_category, sort, req, res)
        // return filterDescription(brand_category, description, res, req)
    } else if (brand_category && item && sort && !search) {
        console.log('correct three')
        // return res.status(200).json({ message: "Correct three" });
        return filterPropertiesAndSort(brand_category, sort, item, req, res)
        // return filterTitle(brand_category, title, res, req)
    } else if (brand_category && search && !item && !sort) {
        console.log('correct four')
        // return res.status(200).json({ message: "Correct four" });
        return filterSearch(brand_category, search, req, res)
        // return filterSearch(brand_category, price, res, req)
    } else if (brand_category && item && sort && search) {
        console.log('correct five')
        // return res.status(200).json({ message: "Correct five" });
        filterAll(brand_category, sort, item, search, req, res)
        // return filterSearch(brand_category, price, res, req)
    } else if (brand_category && search && item && !sort) {
        console.log('correct six')
        // return res.status(200).json({ message: "Correct six" });
        return filterSearchAndProperties(brand_category, search, item, req, res)
        // return filterSearch(brand_category, price, res, req)
    } else if (brand_category && search && sort && !item) {
        console.log('correct seven')
        // return res.status(200).json({ message: "Correct seven" });
        return filterSearchAndSort(brand_category, search, sort, req, res)
        // return filterSearch(brand_category, price, res, req)
    }

})

// @desc    Fetch Products or client page categories search
// route    POST /api/products/category
//@access   Public
const getProductForCategories = asyncHandler(async (req, res) => {
    const { search, title, description, price, brand_category, item } = req.body
    // const { selected, sort } = req.body;

    try {
        let searchQuery = {
            $or: [
                // in the "options" property, "i" means case sensitive
                { title: { $regex: search || "#", $options: "i" } },
                { title: { $regex: title || "#", $options: "i" } },
                { description: { $regex: search || "#", $options: "i" } },
                { description: { $regex: description || "#", $options: "i" } },
                // { price: search || null },
                { price: price || null },
                { brand_category: { $eq: brand_category || null } },
                { 'properties.values': { $regex: item || "#", $options: "i" } },
            ]
        }

        var product = await Product.find(searchQuery).populate("brand_category", "name category")
        product = await Category.populate(product, {
            path: "brand_category.category",
            select: "cat"
        })

        if (product.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }


        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: product });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// @desc    Fetch for Carts filling
// route    POST /api/products/brands  // Change the HTTP method to POST
// @access  Public
const getProductForBrands = asyncHandler(async (req, res) => {
    const { id } = req.body; // brand id

    // if (!id.every(mongoose.Types.ObjectId.isValid)) {
    //     return res.status(404).json({ error: "Invalid ID(s)" });
    // }

    try {
        // Use Promise.all to fetch multiple products based on the array of IDs
        const products = await Promise.all(
            id.map(async (productId) => {
                var product = await Product.find({ brand_category: productId }).populate(
                    "brand_category",
                    "name category"
                );
                return await Category.populate(product, {
                    path: "brand_category.category",
                    select: "cat",
                });
                // return product
            })
        );

        // const validProducts = products.filter((product) => product !== null); 
        // Flatten the array of arrays to get a single array of products
        const validProducts = products.flat();

        // Handle cases where some or all products are not found
        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No such product(s)" });
        }

        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getProductForWishlist = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id.every(mongoose.Types.ObjectId.isValid)) {
        return res.status(404).json({ error: "Invalid ID(s)" });
    }

    try {
        // Use Promise.all to fetch multiple products based on the array of IDs
        const products = await Promise.all(
            id.map(async (productId) => {
                const product = await Product.findById(productId).populate(
                    "brand_category",
                    "name category"
                );
                return await Category.populate(product, {
                    path: "brand_category.category",
                    select: "cat",
                });
            })
        );

        // Handle cases where some or all products are not found
        const validProducts = products.filter((product) => product !== null);

        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No such product(s)" });
        }

        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// @desc    Fetch for Carts filling
// route    POST /api/cart/  // Change the HTTP method to POST
// @access  Public
const getProductForCart = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id.every(mongoose.Types.ObjectId.isValid)) {
        return res.status(404).json({ error: "Invalid ID(s)" });
    }

    try {
        // Use Promise.all to fetch multiple products based on the array of IDs
        const products = await Promise.all(
            id.map(async (productId) => {
                const product = await Product.findById(productId).populate(
                    "brand_category",
                    "name category"
                );
                return await Category.populate(product, {
                    path: "brand_category.category",
                    select: "cat",
                });
            })
        );

        // Handle cases where some or all products are not found
        const validProducts = products.filter((product) => product !== null);

        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No such product(s)" });
        }

        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Sort Products by id
// route    GETT /api/products/sort
//@access   Public
const sortProduct = asyncHandler(async (req, res) => {

    try {
        var products = await Product.find().populate("brand_category", "name category").sort({ _id: -1 }).limit(10)
        products = await Category.populate(products, {
            path: "brand_category.category",
            select: "cat"
        })
        // const products = await Product.find().populate("category", "cat")
        if (!products) {
            return res.status(404).json({ error: "No products found" });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// @desc    Create products
// route    POST /api/products/
//@access   Public
const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, brand_category } = req.body

    const propertiesObj = JSON.parse(req.body.properties)
    // if (req.file) {
    //     try {
    //         const createProduct = new Product({
    //             images: req.file.path
    //         })

    //         await createProduct.save()
    //         console.log("Done")
    //         res.status(201).json({ message: " Created Successfully" })
    //     } catch {
    //         console.log("Not Done")
    //         res.status(400).json({ error: error.message })

    //     }
    // } else 

    if (req.files) {
        try {
            // if (req.files) {
            let path = "";
            req.files.forEach((files, index, arr) => {
                path = path + files.path + ","
            })
            path = path.substring(0, path.lastIndexOf(","))

            // }

            var createProduct = new Product({
                title,
                description,
                price,
                brand_category,
                // category,
                properties: propertiesObj,
                images: path
            })

            var products = await createProduct.save()
            // products = await products.populate("category", "cat")
            products = await products.populate("brand_category", "name properties")
            products = await products.populate("brand_category")
            products = await Category.populate(products, {
                path: "brand_category.category",
                select: "cat"
            })

            console.log("Done")
            res.status(201).json({ products: products, message: "Product created Successfully" })
        } catch {
            console.log("Not Done")
            res.status(400).json({ error: error.message })
        }
    }
    // const images = req.files.map((file) => ({
    //     data: file.buffer,
    //     contentType: file.mimeType
    // }));

    // console.log(title)
    // console.log(req.files)
    // console.log("Done")
    // res.status(201).json({ message: " Created Successfully" })
    // // // Decode the base64 images
    // // const imageBuffers = images.map((base64Image) => {
    // //     return Buffer.from(base64Image, "base64");
    // // });

    // try {
    //     const createProduct = new Product({
    //         title, description, images: images, price
    //     })

    //     await createProduct.save()

    //     console.log("Done")
    //     res.status(201).json({ message: " Created Successfully" })
    // } catch (error) {
    //     console.log("Not Done")
    //     res.status(400).json({ error: error.message })
    // }
});

// const createProduct = asyncHandler(async (req, res) => {
//     const { title, description, images, price } = req.body

//     // // Decode the base64 images
//     // const imageBuffers = images.map((base64Image) => {
//     //     return Buffer.from(base64Image, "base64");
//     // });

//     try {
//         // const createProduct = new Product({
//         //     title, description, images: imageBuffers, price
//         // })

//         await Product.create({
//             title, description, images, price
//         })

//         // await createProduct.save()

//         console.log("Done")
//         res.status(201).json({ message: "Product Created Successfully" })
//     } catch (error) {
//         console.log("Not Done")
//         res.status(400).json({ error: error.message })
//     }
// });

const updateProduct = asyncHandler(async (req, res) => {
    var product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    var brand = await Product.findById(product.brand_category)

    if (!brand) {
        return res.status(404).json({ error: "Category not found" });
    }


    try {
        var propertiesObj = JSON.parse(req.body.properties)

        console.log(product.properties)
        // if (product.images.length > 0) {
        if (req.files && req.files.length > 0) {
            // Get the file paths of the newly uploaded images
            const newImagePaths = req.files.map((file) => file.path);

            // If the product already has images, delete the old image files
            if (product.images) {
                // Update product images(diskStorage) if new images are uploaded
                const imagePaths = product.images.split(","); // pass each image path as a const

                // Loop through the image paths and delete the corresponding files
                imagePaths.forEach((imagePath) => {
                    const imagePathOnServer = path.join("backend/assets", path.basename(imagePath));
                    fs.unlinkSync(imagePathOnServer); // Delete the image file from the server
                });
            }


            // Update the product"s image field with the new file paths
            product.images = newImagePaths.join(",");
        }

        product.title = req.body.title || product.title
        product.price = req.body.price || product.price
        product.brand_category = req.body.brand_category || product.brand_category
        product.properties = propertiesObj || product.properties
        // product.category = req.body.category || product.category
        product.description = req.body.description || product.description

        // Save the updated product to the database
        await product.save();
        // await product.populate("category", "cat")
        await product.populate("brand_category", "name properties")
        await product.populate("brand_category")
        await Category.populate(product, {
            path: "brand_category.category",
            select: "cat"
        })


        // const products = {
        //     title: product.title, description: product.description, price: product.price, images: product.images
        // }
        console.log("Update successful")
        res.status(201).json({ product: product, message: "Product updated successfully" })
        // res.status(201).json({
        //     _id: updated._id,
        //     title: updated.title,
        //     price: updated.price,
        //     images: updated.images,
        //     description: updated.description
        // })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


const deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document" })
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete the associated image files from the server
        if (product.images) {
            const imagePaths = product.images.split(",");
            // Loop through the image paths and delete the corresponding files
            imagePaths.forEach((imagePath) => {
                const imagePathOnServer = `backend/assets/${path.basename(imagePath)}`;
                fs.unlinkSync(imagePathOnServer); // Delete the image file from the server
            })
        }

        const result = await Product.findByIdAndDelete({ _id: id })

        if (!result) {
            return res.status(404).json({ error: "No such product" })
        }

        console.log("Product deleted successfully");
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: Brand, // Update with the actual name of your brand collection
                    localField: 'brand_category',
                    foreignField: '_id',
                    as: 'brand',
                },
            },
            {
                $unwind: '$brand',
            },
            {
                $lookup: {
                    from: Category, // Update with the actual name of your category collection
                    localField: 'brand.category',
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
                    description: 1,
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

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export {
    getProducts,
    getProduct,
    getProductForCategories,
    getProductForCategoryBrand,
    getProductForBrands,
    getProductForCart,
    getProductForWishlist,
    sortProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}



// const deleteProduct = asyncHandler(async (req, res) => {

//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such document" })
//     }

//     const result = await Product.findByIdAndDelete({ _id: id })

//     if (!result) {
//         return res.status(400).json({ error: "No such result" })
//     }

//     res.status(200).json({ message: "Deleted successfully!" })
// })

// Similar o what you just did here, I also need to be able to update the images not just in the databae, but also in my multer file where it is saved, removing the previous images and adding the updated ones. Show me the code in details as well.
