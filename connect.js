import { config } from "dotenv";
import mongoose from "mongoose";


config();

const connectToMongoDB=()=> mongoose.connect(process.env.MONGODB_URL).then(async ()=>{
    return Promise.resolve("Connected to MongoDb")
}).catch((e)=>{
    return Promise.reject(e)
});

export default connectToMongoDB;