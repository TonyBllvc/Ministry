import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";

// Function to generate OTP with a specified starting digit
const filterProperties = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterSort = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    var product = await Product.find({ brand_category: { $eq: brandCategoryId || null } }).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        );

        const validProducts = products.flat();

        // Sort the validProducts array alphabetically by product name
        switch (search) {
            case '1':
                validProducts.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case '2':
                validProducts.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case '3':
                validProducts.sort((a, b) => b.price - a.price);
                break;
            case '4':
                validProducts.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }

        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }

        // Send the sorted products in the response
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});


// Function to generate OTP with a specified starting digit
const filterPropertiesAndSort = asyncHandler(async (brand_category, sort, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();

        // Sort the validProducts array alphabetically by product name
        switch (sort) {
            case '1':
                validProducts.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case '2':
                validProducts.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case '3':
                validProducts.sort((a, b) => b.price - a.price);
                break;
            case '4':
                validProducts.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

// edit later(incomplete)
const filterSearch = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let low = {
                        $or: [
                            { title: { $regex: search || "#", $options: "i" } },
                            { description: { $regex: search || "#", $options: "i" } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    }
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            low
                            // { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterSearchAndProperties = asyncHandler(async (brand_category, search, item, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { title: { $regex: search || "#", $options: "i" } },
                            { description: { $regex: search || "#", $options: "i" } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                            { 'properties.values': { $regex: item || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterSearchAndSort = asyncHandler(async (brand_category, search, item, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }
        
        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let low = {
                        $or: [
                            { title: { $regex: search || "#", $options: "i" } },
                            { description: { $regex: search || "#", $options: "i" } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    }

                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            low
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();

        // console.log(item)
        // Sort the validProducts array alphabetically by product name
        switch (item) {
            case '1':
                validProducts.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case '2':
                validProducts.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case '3':
                validProducts.sort((a, b) => b.price - a.price);
                break;
            case '4':
                validProducts.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterAll = asyncHandler(async (brand_category, sort, item, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || item === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { title: { $regex: search || "#", $options: "i" } },
                            { description: { $regex: search || "#", $options: "i" } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                            { brand_category: { $eq: brandCategoryId || null } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();

        // Sort the validProducts array alphabetically by product name
        switch (sort) {
            case '1':
                validProducts.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case '2':
                validProducts.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case '3':
                validProducts.sort((a, b) => b.price - a.price);
                break;
            case '4':
                validProducts.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }

        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

// edit later(incomplete)
const filterPrice = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { 'properties.values': { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterDescription = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { description: { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

const filterTitle = asyncHandler(async (brand_category, search, req, res) => {

    try {

        if (!Array.isArray(brand_category) || brand_category.length === 0 || search === undefined) {
            return res.status(400).json({ error: "Invalid or missing parameters" });
        }

        const products = await Promise.all(
            brand_category.map(async (brandCategoryId) => {
                try {
                    let searchQuery = {
                        $and: [
                            { brand_category: { $eq: brandCategoryId || null } },
                            { title: { $regex: search || "#", $options: "i" } },
                        ]
                    };

                    var product = await Product.find(searchQuery).populate("brand_category", "name category");

                    return await Category.populate(product, {
                        path: "brand_category.category",
                        select: "cat"
                    });
                } catch (error) {
                    // Handle errors within the map function
                    console.error(`Error processing brand category ${brandCategoryId}: ${error.message}`);
                    return [];
                }
            })
        )
        const validProducts = products.flat();


        if (validProducts.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }
        // res.status(200).send({ success: true, product });
        res.status(200).json({ products: validProducts });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

});

export {
    filterProperties,
    filterSort,
    filterPropertiesAndSort,
    filterSearchAndProperties,
    filterSearchAndSort,
    // filterPrice,
    // filterDescription,
    filterSearch,
    filterAll
    // filterTitle
}
