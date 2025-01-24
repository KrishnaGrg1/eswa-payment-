import { config } from 'dotenv';
import express from 'express';
import connectToMongoDB from './connect.js';
import mainRoutes from './routes/routes.js';
import captureUserAuthToken from './middlewares/captureUserauthToken.js';

const app=express();
config();
const port=process.env.PORT|| 4000


  

connectToMongoDB().then(function (connectMessage){
    console.log(connectMessage);
    // app.use(captureUserAuthToken)
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static("public"));
    app.set('view engine', 'ejs');

    app.use(mainRoutes)
    app.listen(port,()=>{
        console.log("Server running on PORT : "+port)
    })
}).catch((e)=>{
    console.log("Error:"+e)
})