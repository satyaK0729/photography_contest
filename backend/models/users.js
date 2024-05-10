const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isAdmin:{
    type: Boolean,
    default: false,
  },
  participatedContests:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },
  ]
},

  { timestamps: true }
);
module.exports = mongoose.model("users", User);
