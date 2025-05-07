const mongoose = require("mongoose");
const ReviewModel = require("../model/reviewModel.js");
const asyncHandler = require("express-async-handler");

/* Get All review Data - GET method */
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    //get all review data
    const reviews = await ReviewModel.find({});
    if (!reviews) {
      return res.status(400).json({
        message: "No reviews found!",
      });
    }
    console.log("Get all Reviews Data successfully ");
    res.status(200).json({
      message: "Reviews fetched ok!",
      reviews: { reviews },
    });
  } catch (err) {
    res.send(err);
  }
});
const getReviews = asyncHandler(async (req, res) => {
  try {;
    const UserId=req.user._id;
          if (!UserId) {
      return res.status(400).json({
        message: "No userid found!",
      });
    }
   
    const reviews=await ReviewModel.find({userid: UserId});
  
    if (!reviews) {
      res.status(200).json({
        message: "You don't have any reviews!",
      });
      throw new Error("Reviews not found");
    }

    res.status(200).json({
      message: "Reviews fetched ok!",
      reviews: { reviews },
    });
  } catch (err) {
    res.send(err);
  }
});
//creating review data
const addReview = asyncHandler(async (req, res) => {
  try {
    //review validation
    const { review, rating, userid,reviewername } = req.body;
    if(!review||!rating){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //adding review data
    const addReview = await ReviewModel.create({
      review,
      rating,
      userid,
      reviewername
    });
    if(addReview){
      res.status(200).json({
          message: "Review ok!",
          review:{... review._doc}
      });
  }
  else{
      res.status(400);
      throw new Error("Invalid Data");
  }
console.log("Review added") 
  } catch (err) {
    res.send(err);
  }
});
//delete review data
const deleteReview = async (req, res) => {
  try{
    const id=req.params.id;
    //review data validation
    const review = await ReviewModel.findById(id);
    if (!review) {
      res.status(400);
      throw new Error("review not found");
    }
  
    //deleting review data by id
    console.log(req.params.id);
    const deleteReview = await ReviewModel.findByIdAndDelete(id);
    res.status(200).send("Review deleted sucessfully");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getAllReviews, getReviews, addReview, deleteReview };
