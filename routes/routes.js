import { Router } from "express";
import authRouter from "./auth.js";
import movieRouter from "./movie.js";
import subscriptionPlanRouter from "./subscriptionPlan.js";
import paymentRouter from "./payment.js";

const mainRoutes=Router();


mainRoutes.use('/auth',authRouter)
mainRoutes.use('/movie',movieRouter)
mainRoutes.use('/subscriptionPlan',subscriptionPlanRouter)
mainRoutes.use('/payment',paymentRouter)


export default mainRoutes