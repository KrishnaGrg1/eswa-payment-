//generate 6digits random number

const generateOtp=()=>{
    const number=parseInt(Math.random()*(100000))+100000
  
    if(number<=99999){
        return generate()
    }
    return number

    
}



export default generateOtp;
