import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "../env.js";

const generateToken = (res, _id, session) => {
    const token = jwt.sign({
        _id, session
    }, JWT_SECRET, {
        expiresIn: '2d'
    })

    // to store in cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        // maxAge: 9000
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    })
} 

export default generateToken