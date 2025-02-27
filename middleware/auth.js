import jwt from "jsonwebtoken"
// import authMiddleware from '../middleware/auth.js';
// import authMiddleware from '../middleware/auth.js'

const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token);
        console.log('data')
        console.log(token_decode);
        req.body.userID=token_decode.id;
        next()
       
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export default authMiddleware
