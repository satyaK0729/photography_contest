const mongoose = require("mongoose");

const Contest=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   participants :[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
          }
    ],
   images:[
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'photos',
      }
   ],
   voteWeight:{
         type:Number,
   },
   winner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
   },
   startDate:{
         type:Date,
         required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    RegistrationEndDate:{
        type:Date,
        required:true
    },
    bannerImg:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'photos',
    },
    winningImage:{
        type:String,
        required:false
    },
    status:{
        type:String,
        default:"Active"
    }
},
{timestamps:true})
module.exports=mongoose.model('contests',Contest);