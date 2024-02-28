import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from '../model/userModel.js'
import Waiting from "../model/waitingModel.js";

// everything would be done inside here

const verified = AsyncHandler(async (req, res, next) => {
    try {
        const otpConfirm = await Waiting.findOne({ email: req.body.email });
        const user = await User.findOne({ email: req.body.email });

        try {
            // check if user exists or not
            // if not, throw error
            if (!user) {
                return res.status(401).json({ error: 'Incorrect email and password' })
            }

            if (user?.role !== 'Admin') {
                if (otpConfirm) {
                    if (otpConfirm?.pending === 'yes') {
                        return res.status(401).json({ error: 'Verify OTP first' })
                        // Redirect to the '/api/verify_otp' URL
                        // return res.redirect('http://localhost:3000/verify_otp');
                    }
                } else {
                    // Handle the case where otpConfirm is not found
                    return res.status(401).json({ error: 'Account is not verified. Register again!' });
                }
            }
        } catch (error) {
            return res.status(401).json({ error: error.message });

        }

        next();

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create a function Validate otp by scanning it


const protect = AsyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded._id).select('-password')

            next()
        } catch (error) {
            res.status(401).json({ error: 'Invalid authorization' })
        }
    } else {
        res.redirect('/spiritual/login.html'); // Redirect to login page if not authenticated
        // res.status(401).json({ error: 'Not authorized' })
    }
})



const adminClearance = AsyncHandler(async (req, res, next) => {
    // find the user based on role being handled
    switch (req.user.role) {
        case 'Admin':
            next()
            // res.status(200).json({ message: 'Authentic' })
            break;
        case 'admin':
            next()
            // res.status(200).json({ message: 'Authentic' })
            break;
        case 'User':
            return res.status(401).json({ error: 'Unathorized accessing' })
            break;
        case 'Student':
            return res.status(401).json({ error: 'Unathorized accessing' })
            break;
        default:
            return res.status(401).json({ error: 'Unathorized accessing' })
        // break;
    }
    // if (req.user.role !== 'Admin' || req.user.role !== 'admin') {
    //     return res.status(401).json({ error: 'Unathorized accessing' })
    // } else if (req.user.role == 'Admin' || req.user.role == 'admin') {
    // next()
    // }
})


export {
    verified,
    protect,
    adminClearance
}