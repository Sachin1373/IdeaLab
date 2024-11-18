import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

const connectdb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error",error.message)
    }
}

export default  connectdb