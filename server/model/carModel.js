const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 15 },
  brand:{ type: String, required: true},
  type:{ type: String, required: true },
  fuel:{ type: String, required: true },
  capacity: { type:String, required: true },
  gear:{type: String, required: true},
  status:{type:String,required:true},
  rateperday:{ type: Number, required: true},
  thumbnail: { type: String},
  userid: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "users",
    },
},
{timestamps:true});

module.exports = mongoose.model("cars", carSchema);

