import { Router } from "express";
import movieController from "../controllers/movie.js";
import validate from "../middlewares/valdation.js";
import validationSchema from "../validations/movie.js"


const movieRouter=Router()



movieRouter.post('/add',validate(validationSchema.addMovie),movieController.addMovie);

export default movieRouter