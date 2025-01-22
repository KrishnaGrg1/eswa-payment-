import joi from 'joi'

export default{
    register:{
        body: joi.object().keys({
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            password:joi.string().min(8).required(),
            subscription_type:joi.string()
        })
        
    },
    login:{
        body:joi.object().keys({
            email:joi.string().email().required(),
            password:joi.string().min(8).required()
        })
    },
    forget:{
        body:joi.object().keys({
            email:joi.string().email().required()
        })
    },
    reset: {
        body: joi.object().keys({
            email:joi.string().email().required(),
            password: joi.string().min(8).required(),
            otp: joi.number().integer().min(100000).max(999999).required()
        })
    }    
}