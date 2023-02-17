
const User=require("../models/user_details");
const { builtinModules } = require("module");
const Article_model=require("../models/Article_model");
const Tag_model=require("../models/tags");
const { ObjectId } = require('mongodb');
const {mongoose, isObjectIdOrHexString, Mongoose}=require('mongoose');
require('dotenv').config();
const {v2}  =require('cloudinary')
const cloudinary=v2;


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//GET all Articles
const get_all_Articles=async (req,res)=>
{        
    
    const {_end,_order,_start,_sort,title_like="",articleType=""}=req.query;
    const query={};
    if(articleType!==''){
        query.articleType=articleType; 
    }
    if(title_like)
    {
        query.title={$regex:title_like,$options:'i'};
    }

    try{        
    const count=await Article_model.countDocuments({query});    
    const Article=await Article_model.find(query).limit(_end).skip(_start).sort({[_sort]:_order});
    res.header('x-total-count',count);
    res.header('Access-Control-Expose-Headers','x-total-count');
    console.log(query)
    res.status(200).json(Article);
    }
    catch(error)
    {
        res.status(500).json({"Message":error.mesage})
    }
    
}
//Post an Article
const post_Article=async (req,res)=>
{    
    try{
        const {title,description,SportsTag,photo,email}=req.body;
        console.log(title,description,SportsTag,email)
        const session=await mongoose.startSession();
        session.startTransaction();
        const user=await User.findOne({email}).session(session);
        if(!user)
        {
            throw new Error("User not found!")
        }
        else{            
            const photoUrl=await cloudinary.uploader.upload(photo);            
            const article=await Article_model.create({title,description,articleType:SportsTag,photo:photoUrl.url,creator:user._id})
            user.allArticles.push(article._id);
            await user.save();
            await session.commitTransaction();
            res.status(200).json({"Message":"Article Created!"})
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({"Message":error.mesage})
    }
}
//Get Single Article

const get_single_Article=async(req,res)=>{
    const {id}=req.params; 
    console.log(id);
    const ArticleExists=await Article_model.findOne({_id:id}).populate('creator');
    if(ArticleExists)
    {
        res.status(200).json(ArticleExists);
    } 
    else{
        res.status(404).json({message:"Article not found."})
    }    
}
//Delete an Article
const delete_Article=async (req,res)=>{
    const {id}=req.params;
    const Article_res=await Article_model.findOneAndDelete({_id:id}).populate('creator');
    if(!Article_res)
    {
        return res.status(404).json({"Error":"No Article Found!"});
    }
    else{
        const session=await mongoose.startSession();
        session.startTransaction();
        Article_res.remove(session);
        Article_res.creator.allArticles.pull(Article_res);
        await Article_res.creator.save({session});
        await session.commitTransaction();
        res.status(200).json({message:"Article Deleted Succesfully!"})        
    }

}
const get_all_Categories=async(req,res)=>{
    
    try{                
        const categories=await Article_model.aggregate([{
            $lookup: {
            from: 'tags',
            localField: 'articleType',
            foreignField: 'articleType',         
            as: 'data',
            },               
            
        },
        
    ]);        
        return res.status(200).json(categories);
    }
    catch(error)
    {
        console.log(error.message)
        return res.status(500).json({"Message":error.mesage})
    }

}
const get_single_Categories=async(req,res)=>{
    
    try{        
        const {tag}=req.params;
        const categories=await Article_model.find({articleType:tag});
        console.log(categories)
        return res.status(200).json(categories);
    }
    catch(error)
    {
        console.log(error.message)
        return res.status(500).json({"Message":error.mesage})
    }

}
//Update an Article
const update_Article=async(req,res)=>{
    const {id}=req.params;
    const {title,description,photo,articleType}=req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({"Error":"No Article Found!"});
    }
    const Article_res=await Article_model.findByIdAndUpdate({_id:id},
       {$set :{
            user_name:ObjectId(user_id),
            Article:Article,
            Article_title:Article_title,
            tag:ObjectId(tag_id)
        
    }})
     console.log(Article_res);      
    if(!Article_res)
    {
        return res.status(404).json({"Error":"No Article Found!"});
    }
    else{
        return res.status(200).json(Article_res);
    }

}

module.exports ={
    post_Article,
    get_all_Articles,
    get_single_Article,
    delete_Article,
    update_Article,
    get_all_Categories,
    get_single_Categories,
}