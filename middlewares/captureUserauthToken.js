import jwt from 'jsonwebtoken';
import catchAsync from '../helpers/catchAsync.js';
import User from '../models/user.js';

const captureUserAuthToken=catchAsync(async(req,res,next)=>{
    const token=req.headers['authorization'];
    const match=token.match(new RegExp('^Bearer (.*)$'));
    if(match && match[1]){
        const payload=jwt.verify(match[1],process.env.JWT_Secret_Key);
         console.log(payload.userid)
        
        if(!payload){
            throw new Error ("Payload is blank")
        }
        if(payload.userid){
            const userId=payload.userid;
            const user=await User.findOne({_id:userId});
            req.user=user;
            console.log("Login Found of "+user.name)
            next();
        }else{
            throw new Error ("Subject not found")

        }
    }else{
        throw new Error ("Invalid Bearer token ")
    }
})


export default captureUserAuthToken