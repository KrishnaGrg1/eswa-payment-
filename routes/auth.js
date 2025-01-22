import { Router } from "express";
import authController from "../controllers/auth.js";
import validate from "../middlewares/valdation.js";
import validationSchema from '../validations/auth.js'
const authRouter=Router();



authRouter.post('/register',validate(validationSchema.register),authController.register);

authRouter.post('/login',validate(validationSchema.login),authController.login)
authRouter.post('/forget-password',validate(validationSchema.forget),authController.forgetPassword)
authRouter.post('/reset-Password',validate(validationSchema.reset),authController.resetPassword)


export default authRouter