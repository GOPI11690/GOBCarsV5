const mongoose=require("mongoose");
const UserModel=require("../model/userModel.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const asyncHandler=require("express-async-handler");

/* Get All user Data - GET method */
const getAllUsers=async (req, res) => { 
    try {
       //get all user data
       const users = await UserModel.find({});
       if (!users) {
         return res.status(400).json({
           message: "No users found!",
         });
       }
       console.log("Get all users Data successfully ");
       res.status(200).json({
         message: "Users fetched ok!",
         Users: { users },
       });
     } catch (err) {
       res.send(err);
     }
};

/* Get user data with id - GET method */
const getUser=async (req, res) => { 
    try{
        let userid;
        //get user id from params or from token
        if(!req.params.id){
            userid=req.user._id;
        }
        else{
            userid=req.params.id;
        }
            //get  user data
        const user=await UserModel.findById(userid);
        //User validation
        if (!user) {
            return res.status(400).json({
              message: "No user found!",
            });}
        res.status(200).json({
            message: "User data fetched ok!",
            user:{... user._doc}
          });
        }
        catch(err) {res.send(err);}
    
};
//login user
const loginUser=asyncHandler(async(req, res) => {
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: "No email found!"
            })
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Password doesn't match!"
            })
        };
    
        const token=await generateToken(user._id);
        res.cookie("token",token,{httpOnly:true,maxAge:24*60*60*1000,secure:true,sameSite:'none'});
        user.lastLogin = Date.now();

        await user.save();
        res.status(200).json({
            message: "Login ok!",
            user:{... user._doc}
        });
       
    }         
   
    catch (error) {
        console.log("Login error: ", error);
        res.status(400).json({
            message: error.message
        });
    } 
});
    

//register new user
const addUser=asyncHandler(async(req, res) => {
    const {username,contact,email,password,roles,userstatus}=req.body;
    if(roles.includes("dealer")){
        roles.push("user");
    }
    //check user data validation
    if(!username || !contact||!email||!password||!roles||!userstatus){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //User already exists or not
    const userExists=await UserModel.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    } 
    //hash password
    const salt=await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPwd=await bcrypt.hash(password,salt);

    //add user
    const user=await UserModel.create({
        name:username,
        contact:contact,
        email:email,
        password:hashedPwd,
        roles:roles,
        userstatus:userstatus
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            contact:user.contact,
            email:user.email,
            roles:user.roles,
            userstatus:user.userstatus
            
        });
        console.log("User created");
    }
    else{
        res.status(400);
        throw new Error("Invalid Data");
    }
});
//update user data
const updateUser=asyncHandler(async(req,res)=>{
    //find user in db
    const user=await UserModel.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("user not found");
    }
    //update user data by id in db
    const updatedUser=await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    console.log("User data updated")
    res.status(200).send(updatedUser);
});

//delete user data
const deleteUser=asyncHandler(async(req,res) => {
    //find user in db
    const user=await UserModel.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("user not found");
    }
    //delete user data by id in db
    const deletedUser=await UserModel.deleteOne({_id:req.params.id});
    console.log("User deleted")
    res.status(200).send({id:req.params.id});
});
//token generation with id
const generateToken=(id)=>{
    const token=jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'});
    return token;
}
const getProfile=(req,res)=>{
    const {token}=req.cookies
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,{},(err,user)=>{
            if(err) throw err;
            res.json(user);
        })
    }else{
        res.json(null);
    }
}
const addLicense=async (req,res)=>{
    try{
        const {licenseNumber,expiryDate,userid}=req.body;
    //check user data validation
    if(!licenseNumber || !expiryDate){
        res.status(400);
        throw new Error("Please enter license and expiry details");
    }
    const user = await UserModel.findById(userid);
    user.licensenumber=licenseNumber;
    user.expirydate=expiryDate;
    user.save();
    res.status(200).json({
        message: "Login ok!",
        user:{... user._doc}
    });
}catch(e){
    
        res.status(400);
        throw new Error("Invalid Data");


}

}  
const logOut=asyncHandler(async(req,res)=>{
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout ok!"
        });
   
    
});

module.exports = {getAllUsers,getUser,addUser,updateUser,deleteUser,loginUser,getProfile,addLicense,logOut};