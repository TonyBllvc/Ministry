import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import mongoose, { mongo } from "mongoose";
import Waiting from '../model/waitingModel.js';
// import speakeasy from "speakeasy";
import generateOTPToken from '../utils/generateOTPToken.js';
import generateOtp from '../utils/generateOTP.js';

// @desc    Auth admin/set token
// route    POST /api/admin/auth
//@access   Public

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    let emptyFields = []

    if (!email) {
        emptyFields.push('No email allocated')
    }
    if (emptyFields.length > 0) {
        return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        // pick up admin and password(with hash) 
        const admin = await User.login(email, password)

        // // create a token
        // generateToken(res, admin._id)
        // create a token
        generateToken(res, admin._id)

        console.log('Token created')
        res.status(200).json({
            _id: admin._id,
            email,
            role: admin.role,
            access: admin.access,
            lastName: admin.lastName,
            name: admin.name
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    // const user = await User.findOne({ email })

    // if (!user) {
    //     res.status(404)
    //     throw new Error('User does not exist')
    // }

    // if (user && (await user.matchPaasword(password))) {
    //     generateToken(res, user._id)
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email
    //     })
    // } else {
    //     res.status(400)
    //     throw new Error('Invalid email or password')
    // }
})

// @desc    Auth user/set token
// route    POST /api/users/auth
//@access   Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    let emptyFields = []

    if (!email) {
        emptyFields.push('No email allocated')
    }
    if (emptyFields.length > 0) {
        return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        // pick up admin and password(with hash) 
        const user = await User.login(email, password)

        // // create a token
        // generateToken(res, admin._id)
        // create a token
        generateToken(res, user._id)

        console.log('Token created')

        if (user.role !== 'Admin') {
            const otpConfirm = await Waiting.findOne({ email: req.body.email });

            if (!otpConfirm) {
                return res.status(404).json({ error: 'User not verified' })
            }
            otpConfirm.otpCode = ''

            await otpConfirm.save()
        }
        
        res.status(200).json({
            // _id: user._id,
            email,
            // role: user.role,
            // access: user.access,
            // lastName: user.lastName,
            name: user.name
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// @desc    Register new user
// route    POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, lastName, password } = req.body


    let emptyFields = []
    if (!name) {
        emptyFields.push('No surname allocated')
    }
    if (!email) {
        emptyFields.push('No email allocated') // check that there is email
    }
    if (emptyFields.length > 0) {
        return res.status(406).json({ error: 'Please fill in all the fields', emptyFields })
    }
    try {
        // pick up admin and password(with hash) 
        const user = await User.signup(name, email, lastName, password)

        // Generate OTP with a starting digit (replace 1 with your desired starting digit)
        // const initialD = 0;
        // const otp = generateOtp('0');

        // // Generate OTP with only digits
        // var otp = speakeasy.totp({
        //     secret: speakeasy.generateSecret().base32,
        //     encoding: 'base32',
        // });

        // send user acount to waiting list for comfirmation
        var waiting = new Waiting({
            _id: user._id,
            email: user.email,
            pending: 'yes',
            otpCode: otp
        })

        // create a 2mins cookie token for otp
        // generateOTPToken(res, otp)

        await waiting.save()
        // // create a token
        // const token = generateToken(res, admin._id)
        // Write a redirect code here

        res.status(201).json({ name, email})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/** GET: http://localhost:8080/api/validate */
async function generateOTP(req, res) {

    try {
        const otp = generateOtp('0');

        // create a 2mins cookie token for otp
        generateOTPToken(res, otp)

        const otpConfirm = await Waiting.findOne({ email: req.body.email });
        console.log(req.body.email)
        console.log(otp)
        otpConfirm.otpCode = otp || ''

        await otpConfirm.save()
        // // create a token
        // const token = generateToken(res, admin._id)
        // Write a redirect code here

        res.status(201).json({ code: otp })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

/** GET: http://localhost:8080/api/validate */
async function validateOTP(req, res) {
    // req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    // res.status(201).send({ code: req.app.locals.OTP })
    const { cookies } = req;

    const otp = cookies.otp;

    try {
        const otpConfirm = await Waiting.findOne({ email: req.body.email });

        if (otpConfirm) {
            // If account verification is pending
            if (otpConfirm.pending === 'yes') {
                // If not otp cookie exists
                if (!otp) {
                    return res.status(401).json({ error: 'OTP is expired, regenerate otp' })
                }

                if (otpConfirm.otpCode != req.body.code) {
                    return res.status(406).json({ error: 'Incorrect code!' });
                } else if (otpConfirm.otpCode == req.body.code) {
                    otpConfirm.otpCode = req.body.code || ''
                    otpConfirm.pending = 'no' || otpConfirm.pending
                }

                await otpConfirm.save()
            }

            res.status(200).json({ message: 'Valid code. Please, login!' })
        } else {
            // Handle the case where otpConfirm is not found
            return res.status(401).json({ error: 'Invalid input!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @desc    Verify user is llogged in
// route    POST /api/users/verify
//@access   Public
const verifyUser = (req, res) => {
    const { cookies } = req;

    const jwt = cookies.jwt;

    if (!jwt) {
        res.status(401).json({ error: 'Unauthorized! Please, log in' })
    }
}

// @desc    Logout user
// route    POST /api/users/logout
//@access   Public

const logoutUser = asyncHandler(async (req, res) => {
    const { cookies } = req;

    const jwt = cookies.jwt;

    // if (!jwt) {
    //     return res.status(400).json({ error: "Already logged out " });
    // }

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(202).json({ message: 'Logged out successfully' })
})


// @desc    Get user lastName
// route    GET /api/users/profike
//@access   Private

const userProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        lastName: req.user.lastName
    }

    // console.log(req.user._id)
    // console.log(req.user.name)
    res.status(201).json({ user })
})


// @desc    Delete user lastName picture
// route    DELETE /api/users/lastName
// @access  Private
const deleteProfilePicture = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        // Perform the logic to delete the user's lastName
        // (Assuming you have a logic for deleting the user's lastName, update it accordingly)
        user.lastName = ''; // Set the lastName field to an empty string or null, depending on your data model
        //   user.lastName = req.body.lastName || user.lastName; // Set the lastName field to an empty string or null, depending on your data model

        await user.save();

        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            lastName: user.lastName,
            name: user.name,
            access: user.access,
            // user: user,
            // message: 'Profile pricture deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lastName:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Update user lastName
// route    PUT /api/users/lastName
//@access   Private

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!req.body.password || req.body.password.length === 0) {
        return res.status(404).json({ error: 'Please enter password' });
    }

    if (req.body.password) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Incorrect password" });
        }
    }

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.lastName = req.body.lastName || user.lastName
        user.access = req.body.access || user.access

        await user.save()

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            access: user.access,
            lastName: user.lastName,
            // user: user,
            // user: updated
        })
    } else {
        res.status(404).json('User not found')
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    // find use od the account
    try {

        const user = await User.find().select('-lastName -password')

        res.status(200).json({
            users: user
        })
    } catch (error) {
        res.status(404).json({ error: 'Nothing found' })
    }
})


const searchUsers = asyncHandler(async (req, res) => {
    // find use od the account
    try {
        let searchQuery = {
            $or: [
                // in the "options" property, "i" means case sensitive
                { name: { $regex: req.body.search || "#", $options: "i" } },
                { email: { $regex: req.body.search || "#", $options: "i" } },
                { role: { $regex: req.body.search || "#", $options: "i" } },
            ]
        }

        const user = await User.find(searchQuery).select('-lastName -password')

        if (user.length === 0) {
            return res.status(404).json({ error: "No such user" });
        }

        res.status(200).json({
            users: user
        })
    } catch (error) {
        res.status(404).json({ error: 'Nothing found' })
    }
})

const updateRole = asyncHandler(async (req, res) => {
    // find use od the account
    const user = await User.findById(req.body.id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // console.log(user.name)
    if (req.body.role === 'Admin') {
        return res.status(404).json({ error: "Can't change role of admin" });
    }

    // console.log(user.name)
    // if (req.body.role === 'Admin') {
    //     return res.status(404).json({ error: "Can't change role of admin" });
    // }

    if (user) {
        user.role = req.body.role || user.role

        if (req.body.role === 'User') {
            user.access = 'no'
        }

        const updated = await user.save()

        res.status(201).json({
            role: updated.role, message: 'Role update successful'
        })
    } else {
        res.status(404).json('User not found')
    }
})

const updateAccess = asyncHandler(async (req, res) => {
    // find use od the account
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // // console.log(req.body.role)
    // if (req.body.role === 'Admin') {
    //     return res.status(404).json({ error: "Can't change role of admin" });
    // }

    if (user) {
        user.access = req.body.access || user.access

        await user.save()

        res.status(201).json({
            message: 'Now re-enter login details'
        })
        // res.status(201).json({
        //     _id: user._id,
        //     email: user.email,
        //     role: user.role,
        //     name: user.name,
        //     access: user.access,
        //     lastName: user.lastName,
        // })
    } else {
        res.status(404).json('User not found')
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body;

    // console.log(req.user._id)
    // console.log(req.user.id)
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare new password to current password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        // if (hashedNewPassword) {
        //     user.password = hashedNewPassword || user.password
        // }
        if (hashedNewPassword) {
            await User.findByIdAndUpdate({ _id: req.user._id }, { password: hashedNewPassword });
        }

        res.status(201).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
})

export {
    authAdmin,
    authUser,
    registerUser,
    verifyUser,
    logoutUser,
    userProfile,
    updateProfile,
    deleteProfilePicture,
    getAllUsers,
    searchUsers,
    updateRole,
    updateAccess,
    generateOTP,
    validateOTP,
    changePassword
}