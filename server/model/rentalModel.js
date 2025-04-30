const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  startdate: { type: Date, required: true },
  returndate: { type: Date, required: true },
  amount:{type:Number, required: true},
  rentalstatus:{type:String},
  carid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cars",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
},
{timestamps:true});

module.exports = mongoose.model("rentalinfos", rentalSchema);
