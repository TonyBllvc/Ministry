import asyncHandler from 'express-async-handler'
import Product from '../model/productModel.js';
import Category from '../model/categoryModel.js';
import Order from '../model/orderModel.js';
import Stripe from 'stripe';

const STRIPE_SK = "sk_test_51OG8Z4AevTOUUHiHM5BFm8zkBo50vTsgYp0WuL45kw12Jr3uaUmidljJkZSCqS8BaJIcoheWEJbw4hZtn5x5qXeQ00WuqwQUtl"
const STRIPE_PK = "pk_test_51OG8Z4AevTOUUHiHDT60w6hbdjZvEdb5nD2HsTTudUwt6uLApX3avuhmL6RTtl5PmhcCgzMrH66lUmwGDBUhB4gM00t9rVmHnz"


const stripe = new Stripe(STRIPE_SK);

const placeOrder = asyncHandler(async (req, res) => {

    const { name, email, city, postal, address, country, userId, products } = req.body;
    // let emptyFields = []

    // if (!name) {
    //     emptyFields.push('No name allocated')
    // }
    // if (!email) {
    //     emptyFields.push('No Email allocated')
    // }
    // if (!city) {
    //     emptyFields.push('No City allocated')
    // }
    // if (!postal) {
    //     emptyFields.push('No Postal code allocated')
    // }
    // if (!address) {
    //     emptyFields.push('No Street Address allocated')
    // }
    // if (!country) {
    //     emptyFields.push('No country allocated')
    // }
    // if (emptyFields.length > 0) {
    //     return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    // }

    // const productsId = products.split(',')
    const productsId = products
    const uniqueIds = [...new Set(productsId)]
    const productsInfos = await Product.find({ _id: uniqueIds })

    let line_items = []

    try {
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId)
            const quantity = productsId.filter(id => id === productId)?.length || 0
            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'USD',
                        product_data: { name: productInfo?.title },
                        unit_amount: productInfo.price * 100
                        // unit_amount: quantity * productInfo.price * 100 / calculatio has been done already
                    }
                })
            }
        }

        const order = await Order.create({
            line_items, name, email, city, postal, userId, address, country, paid: false
        })


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: 'http://localhost:3000/cart?success=1',
            cancel_url: 'http://localhost:3000/cart?canceled=1',
            metadata: { orderId: order._id.toString() }
        })


        res.status(201).json({ url: session.url });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



const getOrder = asyncHandler(async (req, res) => {
    try {
        const order = await Order.find().sort({ createdAt: -1 }).populate("userId", "name email profile")


        res.status(200).json({ orders: order });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// @desc    Fetch orders for specific user
// route    GET /api/checkout  // Change the HTTP method to POST
// @access  Public
const getUserOrders = asyncHandler(async (req, res) => {
    try {

        const order = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 }).populate("userId", "name email profile")

        if (!order) {
            return res.status(404).json({ error: 'No order or this user' })
        }

        res.status(200).json({ orders: order });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
export {
    placeOrder,
    getOrder,
    getUserOrders
}