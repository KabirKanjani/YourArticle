const { builtinModules } = require("module");
const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require("../models/user_details");

const createToken=(_id)=>{
    console.log("Hello JWT")
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
}
const getAllUsers=async(req,res)=>{

    try{
        console.log("Hello World!")
        const user_data=await User.find({}).limit(req.query._end);
        console.log(user_data)
        res.status(200).json(user_data);
    }
    catch(error)
    {
        res.status(500).json({"message":error.message})
    }

}

const getUserInfoById=async(req,res)=>{
    try
   {
    const {id}=req.params;
    console.log(id)
    const user=await User.findOne({_id:id}).populate('allArticles');
    if(user) res.status(200).json(user);
   }
    catch(error)
    {
    res.status(400).json({"Message":"User Not Found!"})
    }
}


//login User
const loginUser=async(req,res)=>
{    
    
    console.log(req.body)
    const {user_email,user_password}=req.body;
    try{
        const user =await User_Details.login(user_email,user_password);
        const token=createToken(user._id);
        return res.status(200).json({user_email,token});
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}


//Signup User
const signupUser=async(req,res)=>
{
    try{
        console.log("Hello")
        const {name,email,avatar}=req.body;        
        const userExists=await User.findOne({email})
        console.log(userExists)
        if(userExists)
        {
            console.log("EXists")
            return res.status(200).json(userExists);
        }
        console.log("Hello1")
        const newUser=await User.create({
            name,email,avatar
        })
        console.log("Hello2")
        res.status(200).json(newUser);
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
    
}

module.exports ={loginUser,signupUser,getAllUsers,getUserInfoById}
