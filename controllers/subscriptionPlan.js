import catchAsync from "../helpers/catchAsync.js";
import SubscriptionPlan from "../models/subscriptionplan.js";



const addsubscriptionPlan=catchAsync( async(req,res)=>{
    const existingsubscriptionPlan=await SubscriptionPlan.findOne({plan_name:req.body.plan_name})
    
    if(existingsubscriptionPlan){
        throw new Error ("subscriptionPlan already taken or used");
    }
    
    const newsubscriptionPlan=(await SubscriptionPlan.create(req.body)).toObject();

    return res.json({
        message:"subscriptionPlan added Successfully",
        subscriptionPlan:{...newsubscriptionPlan,password:undefined}
    })
});

const getSubscriptionPlans = catchAsync(async (req, res) => {

      const plans = await SubscriptionPlan.find({});
      res.json({
        success: true,
        plans
      });
    
  });


const subscriptionPlanController={
    addsubscriptionPlan,getSubscriptionPlans
}
export default subscriptionPlanController