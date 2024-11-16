import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helemt from "helmet"
import compression from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectdb from "./src/Config/Database.js"

dotenv.config({
    path:'./.env'
})

const app = express()
const PORT = process.env.PORT || 5000

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(helemt())
app.use(compression())
app.use(cookieParser())
app.use(morgan())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });



//basic route
app.get("/api/v1", (req, res) => {
    res.send("Backend is running!");
});


// db connection
connectdb()

app.listen(PORT,()=>{
    console.log("Server is started at port : ",PORT)
})