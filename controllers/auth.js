import catchAsync from "../helpers/catchAsync.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import { createJwt, findUserByEmail } from "../services/user.js";

import sendmail from "../services/sendmail.js";


const register=catchAsync( async(req,res)=>{
    const existingUser=await findUserByEmail(req.body.email);
    
    if(existingUser){
        throw new Error ("Email already taken or used");
    }
    // const hashedPassword=await bcrypt.hash(req.body.password,10);
    const newUser=(await User.create(req.body)).toObject();

    return res.json({
        message:"User Registered Successfully",
        user:{...newUser,password:undefined}
    })
});

const login=catchAsync(async(req,res)=>{
    const {email,password}=req.body;

    const existingUser=await findUserByEmail(req.body.email);
    if(!existingUser){
        throw new Error ("Incorrect Email");
    }

    const hashedPassword=existingUser.password;

    const matched=await bcrypt.compare(password,hashedPassword);

    if(matched){
       const token=createJwt(existingUser._id)
        return res.json({
            message:"Successfully User logged In",
            User:{...existingUser,password:undefined,token}
        })
    }else{
        throw new Error ("Invalid email and password")
    }
})

const forgetPassword = catchAsync(async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            throw new Error("Email not found");
        }
        console.log(1);
       
        const result = await sendmail(existingUser.email);
        console.log("Sendmail result:", result); 

        // Ensure result and OTP are valid
        if (!result ) {
            console.error("Failed to generate OTP or send email");
            throw new Error("OTP could not be generated or email sending failed");
        }

        existingUser.otp = result.otp;
        existingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000);  // OTP expiration (15 minutes)

        // Save the updated user document
        await existingUser.save();

        return res.json({
            message: "OTP sent successfully to user",
            
        });
    } catch (error) {
        console.error("Error in recovery function:", error);  // Log errors here too
        return res.status(500).json({ error: error.message });
    }
});

const resetPassword = catchAsync(async (req, res) => {
   
    try {
        // const {otp,newpassword}=req.body;
        const { email, otp, password } = req.body;
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            throw new Error("Email not found");
        }
         // Check if OTP matches
         if (otp !== existingUser.otp) {
            throw new Error("OTP does not match");
        }
        if (new Date() > existingUser.otpExpires) {
            throw new Error("OTP has expired");
        }

        existingUser.password=await bcrypt.hash(password,10);
        existingUser.otp=null;
        await existingUser.save();

       

        return res.json({
            message: "Successfully updated password",
           
        });
    } catch (error) {
        console.error("Error in recovery function:", error);  // Log errors here too
        return res.status(500).json({ error: error.message });
    }
});




const authController={register,login,forgetPassword,resetPassword}

export default authController