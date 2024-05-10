const express=require('express')
const mongoose=require('mongoose')
const bp=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const http=require('http')
const path=require("path")
const cp=require('cookie-parser')

const authRoutes =require('./routes/auth')
const contestRoutes =require('./routes/contest')
const photoRoutes =require('./routes/photo')

const app=express()
const server=http.createServer(app)


dotenv.config()

mongoose.connect(process.env.MONGOURL).then(console.log("connected successfully")).catch((e)=>{console.log(e)})


app.use(cors({ credentials : true,  origin: "http://localhost:3000" }))
app.use(bp.json({limit:'5mb'}))
app.use(bp.urlencoded({limit:'5mb',extended:true}))
app.use(cp())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/user',authRoutes)
app.use('/api/contest',contestRoutes)
app.use('/api/photo',photoRoutes)



server.listen(process.env.PORT || 8000,()=>{
console.log('server is listening on port 8000 ....')
})