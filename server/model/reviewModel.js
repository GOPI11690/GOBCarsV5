const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: { type: String, required: true },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reviewername:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userreviews", reviewSchema);
