import catchAsync from "../helpers/catchAsync.js";

const requireLogin=catchAsync((req,res,next)=>{
    if(!req.user){
        throw new Error ("Login required");
    }
       next();
    
})

export default requireLogin