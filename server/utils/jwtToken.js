// import jwt from "jsonwebtoken";

// export const generateJWTToken = async(User, message, statusCode, res) => {
//     const token = jwt.sign({id: User._id}, process.env.JWT_SECRET_KEY, {
//         expiresIn: process.env.JWT_EXPIRE,
//     });

//     return res.status(statusCode).cookie("token", token, {
//         maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV !== "development" ? true : false,
//     }).json({
//         success: true,
//         message,
//         token,
//     });
// };

import jwt from "jsonwebtoken";

export const generateJWTToken = async (User, message, statusCode, res) => {
    const token = jwt.sign(
        { id: User._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );

    return res
        .status(statusCode)
        .cookie("token", token, {
            maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",   // ✅ FIXED
            secure: true,       // ✅ FIXED (always true in production)
        })
        .json({
            success: true,
            message,
            token,
        });
};