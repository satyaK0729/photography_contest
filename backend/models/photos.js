const mongoose = require("mongoose");

const Photo=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  }]
},
{timestamps:true})
module.exports=mongoose.model('photos',Photo);