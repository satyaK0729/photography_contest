const jwt=require('jsonwebtoken');
const users = require('../models/users');

const varifyuser=async(req,res,next)=>{
    const cookie=req.cookies.token;
    if(!cookie){
        return  res.status(200).json({"success":false,"message":"token not provided"})
    }
    const isvarify=await jwt.verify(String(cookie),process.env.SECRET_KEY,async(err,user)=>{
        if(err){
            res.status(200).json({"success":false,"message":"invalid token provided"})
        }
        const u=await users.findOne({"_id":user._id});
        req.user=u;
        next()
    }
    
    )
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(200).json({"success":false,"message":"Not authorised as Admin !"})
    }
  }
module.exports= {varifyuser,isAdmin};