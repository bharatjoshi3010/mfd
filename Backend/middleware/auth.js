import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    //this middle were checks whether the user is logged in or not, before changing updating the cart
    const {token} = req.headers;
    if (!token) {
        return res.json({success: false, message:"Not authorised login again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("token decode", token_decode)
        req.body.userId = token_decode.id;  //decoded the user id from the token
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in auth.js"})
    }
}

export default authMiddleware;