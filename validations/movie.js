import joi from 'joi'

export default{
    addMovie:{
        body: joi.object().keys({
            title:joi.string().min(2).required(),
            genre:joi.string().min(2).required(),
            release_date:joi.date().required(),
            duration:joi.number().min(0).required(),
            rating:joi.number().min(0).max(10).required()
        })
        
    }
}



   
  
  