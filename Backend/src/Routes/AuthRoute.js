import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import asynchandler from "../Utils/Asynchandler.js";
import User from "../Models/UserSchema.js";
import { OAuth2Client } from 'google-auth-library';

dotenv.config({ path: './.env' });
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

// ------------------- SIGNUP -------------------
router.post('/signup', asynchandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
}));

// ------------------- LOGIN -------------------
router.post('/login', asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password); // ✅ use await
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '12h' }
  );

  res.json({
    token,
    username: user.username,
    email: user.email
  });
}));

// ------------------- GOOGLE AUTH -------------------

router.post('/google-login', asynchandler(async (req, res) => {
    const { tokenId } = req.body;
    if (!tokenId) {
      return res.status(400).json({ message: 'Token missing' });
    }
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();  
      const { email, name, sub: googleId } = payload;
  
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          username: email.split('@')[0],
          email,
          password: 'google-auth',
          googleId: googleId,
        });
      } else {
        // Update googleId if not present
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '12h',
      });
  
      res.json({
        token,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid Google token' });
    }
  }));
export default router;
