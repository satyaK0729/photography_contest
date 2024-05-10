const router=require('express').Router()
const Contest=require('../models/contests.js')
const Photo=require('../models/photos.js')
const {varifyuser,isAdmin}=require('../middleweres/middlewere.js')
const fs = require('fs')

const multer = require('multer')
const users = require('../models/users.js')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}_${new Date().getMinutes()}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
//create messages

router.post('/newContest', varifyuser, isAdmin, upload.single('photo'), async (req, res) => {
    try {
        // Log body and file details for debugging
        console.log(req.body);

        // Check for missing fields
        if (!req.body.title || !req.file || !req.body.description || !req.body.startDate || !req.body.endDate || !req.body.RegistrationEndDate) {
            return res.status(200).json({ "success": false, "message": "Please provide all the details" });
        }else if (req.file.mimetype != 'image/png' &&  req.file.mimetype != 'image/jpeg' && req.file.mimetype !== 'image/jpg') {
            return res.status(200).json({ "success": false, "message": "Please provide a valid image (PNG or JPEG)!" });
        }

        console.log("hello...")
        const photo = new Photo({
            name: `${process.env.BACKEND_URL}/images/${req.user._id}_${new Date().getMinutes()}_${req.file.originalname}`,
            user: req.user._id
        });
        const savedPhoto = await photo.save();

        // Create contest entry
        const contest = new Contest({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            bannerImg: savedPhoto._id,
            voteWeight:3,
            endDate: req.body.endDate,
            RegistrationEndDate: req.body.RegistrationEndDate
        });
        await contest.save();

        // Respond with success
        res.status(200).json({ "success": true, "message": "Contest Created Successfully!" });
    } catch (error) {
        // Log the error
        console.error(error);

        // Respond with error
        res.status(500).json({ "success": false, "message": "Some error occurred", "error": error.message });
    }
});

//get messages of user

router.post('/getContestByID',varifyuser,async (req,res)=>{
    try{  
  if(!req.body.id){
return res.status(200).json({"success":false,"message":"please provide all the details"})
        }else{ 

  const cont=await Contest.findOne({"_id":req.body.id}).populate('bannerImg').populate('images').populate('participants').populate("winner")
  if(cont){
      res.status(200).json({"success":true,"message":cont})
    }else{
        res.status(200).json({"success":false,"message":"Contest not found !"})
    }
}

}catch(e){
    res.status(400).json({"success":false,"message":"some error occured","error":e.message})
}}
)
router.post('/participateInContest',varifyuser,upload.single('photo'),async (req,res)=>{
    try{  
        if(!req.body.id || !req.file){
    return res.status(200).json({"success":false,"message":"please provide all the details"})
            }else{ 
    
      const cont=await Contest.findOne({"_id":req.body.id})
        if(cont){

              if(cont?.startDate>new Date()){
                return res.status(200).json({"success":false,"message":"Contest not started yet !"})
              }
               if(cont?.RegistrationEndDate<new Date()){
                return res.status(200).json({"success":false,"message":"Registration ended !"})
                }
                
            if(cont.participants.includes(req.user._id)){

                return res.status(200).json({"success":false,"message":"You have already participated in this contest !"})
            }
            const photo=new Photo({
                name:  `${process.env.BACKEND_URL}/images/${req.user._id}_${new Date().getMinutes()}_${req.file.originalname}`,
                user:req.user._id
            })
            const p=await photo.save()

            cont.participants.push(req.user._id)
            cont.images.push(p._id)
            
            const c=await cont.save()

            const user=await users.findOne({"_id":req.user._id})
            console.log(user)
            user.participatedContests.push(cont._id)
            const u=await user.save()

            res.status(200).json({"success":true,"message":"participated successfully !"})
            }else{
                res.status(200).json({"success":false,"message":"Contest not found !"})
            }
    }
}catch(e){
        res.status(400).json({"success":false,"message":"some error occured","error":e.message})
    }})
    router.post('/getContests',varifyuser,async (req,res)=>{
        try{  
            const cont1=await Contest.find({"startDate":{$lt:new Date()}}).populate('bannerImg')
            const cont2=await Contest.find({"startDate":{$gt:new Date()}}).populate('bannerImg')
            const cont3=await Contest.find({"endDate":{$lt:new Date()}}).populate('bannerImg')
            if(cont1 && cont2 && cont3){
                res.status(200).json({"success":true,"message":{"onGoing":cont1,"upcoming":cont2,"ended":cont3}})
            }else{
                res.status(200).json({"success":false,"message":"No contests found !"})
            }
    }catch(e){
            res.status(400).json({"success":false,"message":"some error occured","error":e.message})
        }
    }
    )
    router.post('/makeWinner', varifyuser, isAdmin, async (req, res) => {
        try {
            // Validate input data
            if (!req.body.id) {
                return res.status(200).json({ "success": false, "message": "Please provide contest ID" });
            }
    
            // Fetch contest from database
            const contest = await Contest.findById(req.body.id);
            console.log(contest)
            
            if (!contest) {
                return res.status(200).json({ "success": false, "message": "Contest not found" });
            }
    
            // Check if the contest has ended
            if (contest.endDate > new Date()) {
                return res.status(200).json({ "success": false, "message": "Contest is not ended" });
            }
    
            // Check for participants
            if (contest.participants.length === 0) {
                contest.status = "Ended";
                await contest.save();
                return res.status(200).json({ "success": false, "message": "No participants found" });
            }
    
            // Find the winning photo
            let maxLikes = 0;
            let imageWinner = null;
    
            // Fetch all photos in parallel
            const photos = await Promise.all(contest.images.map(imageId => Photo.findById(imageId)));
    
            // Determine the photo with the most likes
            photos.forEach(photo => {
                if (photo.likes.length > maxLikes) {
                    maxLikes = photo.likes.length;
                    imageWinner = photo;
                }
            });
    
            // Set contest winner and save the contest
            contest.winner = imageWinner?.user;
            contest.status = "Ended";
            contest.winningImage=imageWinner?.name
            await contest.save();
    
            res.status(200).json({ "success": true, "message": "Winner declared successfully" });
    
        } catch (error) {
            // Return error response
            res.status(200).json({ "success": false, "message": "An error occurred", "error": error.message });
        }
    });
    
module.exports = router;