import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helemt from "helmet"
import compression from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectdb from "./src/Config/Database.js"
import ProjectRoutes from "./src/Routes/ProjectsRoutes.js"
import IdeasRouter from "./src/Routes/IdeasRoutes.js"
import AuthRoute from "./src/Routes/AuthRoute.js"
import { expressAnalytics } from 'node-api-analytics';
 
dotenv.config({
    path:'./.env'
})

const app = express()
const PORT = process.env.PORT || 5000

//middlewares
app.options('*', cors());
app.use(cors({
    origin: ['https://idea-lab-chi.vercel.app','http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(bodyParser.json())
app.use(helemt())
app.use(compression())
app.use(cookieParser())
app.use(morgan())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  app.use(expressAnalytics("081b9027-52c7-4144-a06e-bdf4089032fd")); 

//basic route
app.get("/api/v1", (req, res) => {
    res.send("Backend is running!");
});
app.use('/api/v1/projects',ProjectRoutes)
app.use('/api/v1/ideas',IdeasRouter)
app.use('/api/v1/auth',AuthRoute)

// db connection
connectdb()

app.listen(PORT,()=>{
    console.log("Server is started at port : ",PORT)
})