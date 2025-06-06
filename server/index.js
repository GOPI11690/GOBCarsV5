const express=require("express");
const app= express();
const cookieParser = require('cookie-parser');
const cors=require("cors");
const {connectDB}=require("./config/db.js");
const userRoutes=require('./routes/userRouter.js');
const carRoutes=require('./routes/carRouter.js');
const reviewRoutes=require('./routes/reviewRouter.js');
const rentalRoutes=require('./routes/rentalRouter.js');

//dotenv configuration
require('dotenv').config();
const PORT=process.env.PORT;
const frontendURL=process.env.FRONTEND_URL; 
console.log(`Frontend URL: ${frontendURL}`);

// Curb Cores Error by adding a header here
const corsOptions = {
  origin: [frontendURL],
  methods: ['GET', 'POST', 'PUT', 'DELETE','HEAD','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','Origin', 'X-Requested-With','Content', 'Accept'],
  credentials: true // Enable if using cookies or HTTP authentication
};

app.use(cors(corsOptions));
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api/car",carRoutes);
app.use("/api/review",reviewRoutes);
app.use("/api/rental",rentalRoutes);

app.listen(PORT,()=>{
    console.log(`Welcome to GOB Cars - Server is Running at ${PORT}`);
});

connectDB();
