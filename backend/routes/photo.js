const router=require('express').Router()
const Photo=require('../models/photos')
const {varifyuser}=require('../middleweres/middlewere');
const contests = require('../models/contests');



//get user
router.post('/likePhoto',varifyuser,async (req,res)=>{
    try{
        if(req.body.id && req.body.ContestId){
            let userLikesCount = 0;
            const cont=await contests.findOne({"_id":req.body.ContestId}).populate('images')
            
            if(!cont){
                return res.status(200).json({"success":false,"message":"Contest not found !"})
            }
            cont.images.forEach((photo) => {
                if (photo.likes.includes(req.user._id)) {
                    userLikesCount++;
                }
            });
            if(userLikesCount>=cont.voteWeight){
            return res.status(200).json({"success":false,"message":"You have already liked the maximum number of photos allowed for this contest."})
            }else if(cont?.status=="Ended"){
                return res.status(200).json({"success":false,"message":"Contest has ended !"})
            }
            const photo=await Photo.findOne({"_id":req.body.id})
            console.log(photo)
            if(photo){
                if(photo.likes.includes(req.user._id)){
                    return res.status(200).json({"success":false,"message":"photo already liked"})
                }
                photo.likes.push(req.user._id)
                const p=await photo.save()
                return res.status(200).json({"success":true,"message":"photo liked successfully"})
            }
            else{
                res.status(200).json({"success":false,"message":"photo not found !"})
            }
        }
        else{
            res.status(200).json({"success":false,"message":"Provide all information !"})
        }}catch(e){
            console.log(e.message)
            res.status(400).json({"success":false,"message":"some error occured","error":e.message}

            )
    }})



module.exports = router ;