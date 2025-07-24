import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from '@react-oauth/google';
import styles from "../Styles/SignUp.module.css";

function SignUp() {
  const [Formdata,setFormdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const handleChange = (e) =>{
    const {id,value} = e.target;
    setFormdata((prevdata)=>({
      ...prevdata,
      [id] : value,
    }))
  }
  const handlesubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/auth/signup",Formdata) 
      toast.success("User created successfully! Please log in.");
      setTimeout(()=>{
        navigate("/login");
      },1500)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/auth/google-login", {
        tokenId: credentialResponse.credential
      });
      
      const { token, username, email } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      
      toast.success("Google signup successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error(error.response?.data?.message || "Google signup failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again.");
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form} onSubmit={handlesubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" 
            id="name" 
            value={Formdata.name}
            onChange={handleChange}
            placeholder="Enter your name" 
            required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={Formdata.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" 
            id="email" 
            value={Formdata.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={Formdata.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              required
            />
          </div>
          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </form>
        
        {/* Divider */}
        <div className={styles.divider}>
          {/* <span>OR</span> */}
        </div>
        
        {/* Google Signup */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
            width="100%"
          />
        
        <p className={styles.footerText}>
          Already signed up?{" "}
          <p className={styles.loginLink} onClick={()=>navigate('/login')}>
            Login
          </p>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
