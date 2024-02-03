import asyncHandler from 'express-async-handler'
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import Stripe from "stripe";
// import { buffer } from 'micro'
import Order from '../model/orderModel.js';

const STRIPE_SK = "sk_test_51OG8Z4AevTOUUHiHM5BFm8zkBo50vTsgYp0WuL45kw12Jr3uaUmidljJkZSCqS8BaJIcoheWEJbw4hZtn5x5qXeQ00WuqwQUtl"
const STRIPE_PK = "pk_test_51OG8Z4AevTOUUHiHDT60w6hbdjZvEdb5nD2HsTTudUwt6uLApX3avuhmL6RTtl5PmhcCgzMrH66lUmwGDBUhB4gM00t9rVmHnz"

const stripe = new Stripe(STRIPE_SK);
// Handles a catch-all for routes that does not exist
const webHookHandler = async (req, res) => {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = "whsec_537443b3cf00f283810272112a5313fc5ab79b63279b2f45bbba491590c0d81b";
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log({ errMessage: err.message })
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId
            const paid = data.payment_status === 'paid'
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true
                })
            }
            //     case 'charge.succeeded':
            //         const chargeSucceeded = event.data.object;
            //         console.log(chargeSucceeded)
            //         // console.log('yes 1')
            //         break;
            //     case 'payment_intent.succeeded':
            //         const paymentIntentSucceeded = event.data.object;
            //         console.log(paymentIntentSucceeded)
            //         console.log('yes you')
            //         break;
            //     case 'payment_intent.created':
            //         const paymentIntentCreated = event.data.object;
            //         console.log(paymentIntentCreated)
            //         console.log('yes created')
            //         break;
            //     // ... handle other event types 
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send('ok').end()
    // res.status(201).send('seccess')
    // res.status(200).json({
    //     success: true
    // })
}
//easy-finely-faster-affirm
//  acct_1OG8Z4AevTOUUHiH
export {
    webHookHandler,
}