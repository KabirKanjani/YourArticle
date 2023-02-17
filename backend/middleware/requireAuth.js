const jwt=require('jsonwebtoken')
const User_Details=require('../models/user_details');

const requireAuth=async (req,res,next)=>
{    

    console.log(req.headers)
    const {authorizaiton}=req.headers;        
    console.log(authorizaiton)
    if(!authorizaiton){
        return res.status(401).json({error:"Authorization token required"});
    }
    else
    {
        const token=authorizaiton.split(' ')[1];
        try{
            const {_id}=jwt.verify(token,process.env.SECRET);
            console.log(_id);
            req.user=await User_Details.findOne({_id}).select('_id')            
            next();
        }
        catch(error)
        {
            return res.status(401).json({error:error.message});
        }
    }
}

module.exports=requireAuth