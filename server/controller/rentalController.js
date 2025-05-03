const mongoose=require("mongoose");
const RentalModel=require("../model/rentalModel.js");
const asyncHandler=require("express-async-handler");

/* Get All rental Data - GET method */
const getAllRentals=asyncHandler(async (req, res) => { 
    try {
        //get all review data
        const rentals = await RentalModel.find({});
        if (!rentals) {
          return res.status(400).json({
            message: "No rentals found!",
          });
        }
        console.log("Get all rentals Data successfully ");
        res.status(200).json({
          message: "Rentals fetched ok!",
          rentals: { rentals },
        });
      } catch (err) {
        res.send(err);
      }
    
});
/* Get rental data with user id - GET method */
const getRentals=asyncHandler(async (req, res) => { 
   try {
       const UserId=req.params.id;
             if (!UserId) {
         return res.status(400).json({
           message: "No userid found!",
         });
       }
      
       const rentals=await RentalModel.find({userid: UserId});
     
       if (!rentals) {
         res.status(200).json({
           message: "You don't have any Bookings!",
         });
         throw new Error("Rentals not found");
       }
   
       res.status(200).json({
         message: "Rentals fetched ok!",
         rentals: { rentals },
       });
     } catch (err) {
       res.send(err);
     }
    
});
/* Get rental data with id - GET method */
const getRental=asyncHandler(async (req, res) => { 
  try {
      const rentalid=req.params.id;
                
      const rental=await RentalModel.findById(rentalid);
    
      if (!rental) {
        res.status(200).json({
          message: "You don't have any Bookings!",
        });
        throw new Error("Rental not found");
      }
  
      res.status(200).json({
        message: "Rental fetched ok!",
        rental: { rental },
      });
    } catch (err) {
      res.send(err);
    }
   
});


//creating Rental details
const addRental=asyncHandler(async(req, res) => {
    try{
        //validation
    const {startdate,returndate,amount,rentalstatus,carid,userid}=req.body;
    if(!startdate||!returndate){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //add rental data
    const rental=await RentalModel.create({
        startdate,returndate,amount,rentalstatus,carid,userid});
       
        if(rental){
            res.status(200).json({
                message: "Rental ok!",
                rental:{... rental._doc}
            });
        }
        else{
            res.status(400);
            throw new Error("Invalid Data");
        }
    console.log("Rental added")     
}
catch(err){res.send(err);}
});
//deleting rental data
const deleteRental=asyncHandler(async(req,res) => {
    //find rental data by id
    const rental=await RentalModel.findById(req.params.id);
    //rental data validation
    if(!rental){
        res.status(400);
        throw new Error("rental not found");
    }
    //user validation
    if(rental.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //deleting rental data by id
    const deletedRental=await RentalModel.deleteOne({_id:req.params.id});
    res.status(200).send("Rental deleted sucessfully");
});
const addPayment=asyncHandler(async(req,res) =>{
const rental=await RentalModel.findById(req.params.id);
    if(!rental){
        res.status(400);
        throw new Error("Rental not found");
    }
    //update payment data by id in db
    const payment=await RentalModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    console.log("Payment data updated")
    res.status(200).send(payment);
});

module.exports = {getAllRentals,getRentals,getRental,addRental,deleteRental,addPayment};