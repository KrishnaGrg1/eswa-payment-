import catchAsync from "../helpers/catchAsync.js";
import Movie from "../models/movie.js";


const addMovie=catchAsync( async(req,res)=>{
    const existingMovie=await Movie.findOne({title:req.body.title})
    
    if(existingMovie){
        throw new Error ("Movie already taken or used");
    }
    
    const newMovie=(await Movie.create(req.body)).toObject();

    return res.json({
        message:"Movie added Successfully",
        Movie:{...newMovie,password:undefined}
    })
});


const movieController={
    addMovie
}
export default movieController