import joi from 'joi'

export default{
    addpayment:{
        body: joi.object().keys({
            userId: joi.string().hex().length(24).required(),
            planId: joi.string().hex().length(24).required(),
            // transactionUuid: joi.string().uuid().required()
        }) 
    },
    handlepayment:{
        query:joi.object().keys({
            encodedData: joi.string().required()
        }) 
    }

}



   
  