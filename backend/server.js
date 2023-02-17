 const express=require('express');
const mongoose=require('mongoose');

require('dotenv').config();
const ArticleRoutes=require('./routes/Articles.js')
const UserRoutes=require('./routes/user.js')
//Express App
const cors =require('cors');

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}))

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//Routes
app.use('/api/user',UserRoutes);
console.log("kkkkk")
app.use('/api/article',ArticleRoutes);

mongoose.connect(process.env.DATABASE).then( ()=>{
console.log("Badiya");
}).catch((error)=>{
    console.log(error)
})
//Listen for requests
app.listen(process.env.PORT,()=>{
    console.log("Hello MeraMern!!!!");
})
