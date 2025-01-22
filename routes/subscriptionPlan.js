import { Router } from "express";
import subscriptionPlanController from "../controllers/subscriptionPlan.js";
import validate from "../middlewares/valdation.js";
import validationSchema from "../validations/subscriptionPlan.js"


const subscriptionPlanRouter=Router()



subscriptionPlanRouter.post('/add',validate(validationSchema.addsubscriptionPlan),subscriptionPlanController.addsubscriptionPlan);

subscriptionPlanRouter.get('/',subscriptionPlanController.getSubscriptionPlans)

export default subscriptionPlanRouter