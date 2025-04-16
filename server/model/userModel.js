const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true ,min:8},
    roles: {
      // an account can have multiple roles
      type: [String],
      enum: ['admin', 'manager', 'user'],
      default: ['user']
  },
    userstatus: { type: String, required: true },
    
  lastLogin: {
      type: Date,
      default: Date.now
  },
  isVerified: {
      type: Boolean,
      default: false
  },
  },
  { timestamps:true }
);

module.exports = mongoose.model("users", userSchema);
