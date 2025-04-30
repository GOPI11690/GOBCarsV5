const jwt=require("jsonwebtoken");
require('dotenv').config();
const asyncHandler=require("express-async-handler");
const UserModel=require("../model/userModel.js");

const protect=asyncHandler(async(req,res,next)=>{
    let token=req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token found!"
        })
    };
        try{
            let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decodeToken)

        if(!decodeToken) {
            return res.status(402).json({
                message: "Not authorized, invalid token!"
            })
        };
            req.user=await UserModel.findById(decodeToken.id).select('-password'); 
            next();
            
        } catch (error) {
            console.error(error);
    
            return res.status(500).json({
                message: "server error!"
            });
        }
    }
);


module.exports=protect;