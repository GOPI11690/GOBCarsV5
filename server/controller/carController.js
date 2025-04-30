const mongoose=require("mongoose");
const CarModel=require("../model/carModel.js");
const asyncHandler=require("express-async-handler");

/* Get All Car Data - GET method */
const getAllCars=asyncHandler(async (req, res) => { 
    try{
        //get all car data
    const cars=await CarModel.find({});
    //cars validation
    if (!cars) {
        return res.status(400).json({
          message: "No cars found!",
        });}
    console.log("Get all Cars Data successfully ");
    res.status(200).json({
        message: "Cars fetched ok!",
        Cars: { cars },
      });
    }
    catch(err) {res.send(err);}
    
});
/* Get Car data with id - GET method */
const getCar=asyncHandler(async (req, res) => { 
    try{
        //get  car data
    const car=await CarModel.findById(req.params.id);
    //cars validation
    if (!car) {
        return res.status(400).json({
          message: "No car found!",
        });}
    console.log("Get Car Data successfully ");
    res.status(200).json({
        message: "Car fetched ok!",
        Car: { car },
      });
    }
    catch(err) {res.send(err);}
    
});
const getDealerCars=asyncHandler(async(req,res)=>{
    try {
        // const UserId = ObjectId(req.params.id);
        const UserId=req.params.id;
              if (!UserId) {
          return res.status(400).json({
            message: "No userid found!",
          });
        }
       
        const cars=await CarModel.find({userid: UserId});
      
        if (!cars) {
          res.status(200).json({
            message: "You don't have any cars!",
          });
          throw new Error("Cars not found");
        }
    
        res.status(200).json({
          message: "Cars fetched ok!",
          Cars: { cars },
        });
      } catch (err) {
        res.send(err);
      }
})

//creating car details
const addCar=asyncHandler(async(req, res) => {
    const {name,brand,type,fuel,capacity,gear,status,rateperday,thumbnail,userid}=req.body;
    console.log(req.body);
    //car data validation
    if(!name||!brand||!type||!fuel||!capacity||!rateperday||!userid){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //adding car data
    const car=await CarModel.create({
        name:name,
        brand:brand,
        type:type,
        fuel:fuel,
        capacity:capacity,
        gear:gear,
        status:status,
        rateperday:rateperday,
        thumbnail:thumbnail,
        userid:userid
    });
    res.status(200).send(car);
    console.log("Car added successfully ");
});
//update cara data
const updateCar=asyncHandler(async(req,res)=>{
    //get car data by id
    const car=await CarModel.findById(req.params.id);
    //car validation
    if(!car){
        res.status(400);
        throw new Error("Car not found");
    }
    //user validation
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }
    //authorized user only updating car
    if(car.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //updating the car data
    const updateCar=await CarModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(updateCar)
    console.log("Car info updated ");
});
//delete car data
const deleteCar=asyncHandler(async(req,res) => {
    //get car data  by id
    const car=await CarModel.findById(req.params.id);
    //car validation
    if(!car){
        res.status(400);
        throw new Error("Car not found");
    }
    //user validation
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }
    //authorized user only deleting car
    if(car.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //deleting the car data
    const deleteCar=await CarModel.deleteOne({_id:req.params.id});
    res.status(200).send("Car ID : "+car.id);
    console.log("Car deleted successfully");
});
module.exports = {getAllCars,getCar,addCar,updateCar,deleteCar,getDealerCars};