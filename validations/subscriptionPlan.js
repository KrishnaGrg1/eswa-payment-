import joi from 'joi'

export default{
    addsubscriptionPlan:{
        body: joi.object().keys({
            plan_name:joi.string().min(2).required(),
            durationMonth:joi.number().valid(1, 3, 6, 12).required(),
            price:joi.number().valid(1000, 2500, 5500, 10000).required()
        })
        
    }
}



 

   
  
  