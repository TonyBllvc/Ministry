import jwt  from "jsonwebtoken";

const generateOTPToken = (res, otp) => {
    const token = jwt.sign({
        otp
    }, "jwi123", {
        expiresIn: '2d'
    })

    // to store in cookie
    res.cookie('otp', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        // maxAge: 9000
        maxAge: 2 * 60 * 1000, // 2 days
    })
}

export default generateOTPToken;