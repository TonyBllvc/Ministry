import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcryptjs'
import Waiting from "./waitingModel.js";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        emun: ['Admin', 'Author'],
        type: String,
        required: true
    },
    access: {
        emun: ['yes', 'no'],
        type: String,
        required: true
    },
}, { timestamps: true })


// static signup method
// ( while using the 'this' keyword, we can't use  the arrow function)
userSchema.statics.signup = async function (name, email, lastName, password,) {

    // validation
    // check if the mail and password both have values
    if (!name || !email || !password) {
        throw Error('All fields must be filled')
    }
    // to check for replicated emails
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Emails already in use')
    }


    const role = 'User'
    const access = 'no'

    // for two different users use the same password
    // the salt creates a different hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, role, access, lastName: lastName || '', password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    // validation
    // check if the mail and password both have values
    if (!email || !password) {
        throw Error('All fields must be filled')
    }


    // to find the user with email
    const user = await this.findOne({ email })
    // const otpConfirm = await Waiting.findOne({ _id: user._id })

    // check if user exists or not
    // if not, throw error
    if (!user) {
        throw Error('Incorrect email and password')
    }

    // match passwords with the hashed version, to compare
    // two arguments:(
    // 1. normal password value 
    // 2. encrypted password version(hashed) 
    // )
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error(' Incorrect emain and password')
    }

    return user
}

const User = mongoose.model.profiles || mongoose.model('profile', userSchema)

export default User