import User from "../models/user.js";
import jwt from 'jsonwebtoken'
const findUserByEmail=async(email)=>{
    const user=await User.findOne({email});
    if(user) return user.toObject();
    else return null
}
const createJwt=(userid)=>{
    return jwt.sign({userid},process.env.JWT_Secret_Key)
}

export { findUserByEmail,createJwt}