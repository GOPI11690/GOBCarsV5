const {default : mongoose}=require("mongoose");
const dotenv = require('dotenv');

//dotenv configuration
dotenv.config();
const DB_URL = process.env.DB_URL;

//connect to the database
const connectDB= async ()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("connected to Database ");
        
    }
    catch(e){
        console.log("Connection Error",e);
        
    }
};


module.exports = {connectDB};