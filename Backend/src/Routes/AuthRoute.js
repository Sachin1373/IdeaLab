import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import asynchandler from "../Utils/Asynchandler.js"
import User from "../Models/UserSchema.js"

dotenv.config({
    path:'./.env'
})
const router = express.Router()

// signup
router.post('/signup', asynchandler(async(req,res)=>{
    const {name,username,email,password} = req.body

    const userexist = await User.findOne({email})

    if(userexist){
        return res.status(400).json({message : "User already exists"})
    }

    const Hashpassword = await bcrypt.hash(password,10)

    const newuser = new User({name,username,email,password:Hashpassword})

    await newuser.save()
    res.status(201).json({ message: 'User created successfully' })
}))

//login
router.post('/login',asynchandler(async(req,res)=>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})
    if(!user){
       return  res.status(400).json({message:"Invalid credentials"})
    }
    const isMatch =  bcrypt.compare(password,user.password)
    if(!isMatch){
        return  res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: '1h' })
    res.json({token, username: user.username,email: user.email})

}))

//get user details

