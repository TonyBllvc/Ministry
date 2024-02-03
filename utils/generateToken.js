import jwt  from "jsonwebtoken";

const generateToken = (res, _id) => {
    const token = jwt.sign({
        _id
    }, process.env.JWT_SECRET, {
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