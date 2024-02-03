import speakeasy from "speakeasy";

// Function to generate OTP with a specified starting digit
const generateOtp = (initialD) => {
    let otp;
    do {
        otp = speakeasy.totp({
            secret: speakeasy.generateSecret().base32,
            encoding: 'base32',
        });
    } while (otp.includes(initialD));
    // } while (otp.charAt(0) !== initialD.toString());

    return otp;
};

export default generateOtp