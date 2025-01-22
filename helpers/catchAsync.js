const catchAsync=function (requestHandler){
    return async function(req,res,next){
        try{
            await requestHandler(req,res,next)
        }
        catch(e){
            return res.status(400).json({
                error:e.message
            })
        }
    }
}

export default catchAsync