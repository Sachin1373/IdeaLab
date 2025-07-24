import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import styles from "../Styles/Login.module.css";

function Login() {
  const [logindata,setlogindata] = useState({
    email : "",
    password : "",
    })
  const navigate = useNavigate();

  const handlechange = (e) =>{
      const {id,value} = e.target
      setlogindata((prevdata)=>({
        ...prevdata,
        [id] : value,
      }))
    }

    const handlesubmit = async(e) =>{
      e.preventDefault();
      try {
        const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/auth/login",logindata)
        const username = response.data.username
        const token = response.data.token
        const email = response.data.email
        localStorage.setItem("token",token)
        localStorage.setItem("username",username)
        localStorage.setItem("email",email)
        toast.success("Logged in successfully!.");
        setTimeout(()=>{
          navigate("/");
        },1500)
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
      }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
      try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Google Login Success:', decoded);
        
        const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/auth/google-login", {
          tokenId: credentialResponse.credential
        });
        
        const { token, username, email } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        
        toast.success("Google login successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.error('Google login error:', error);
        toast.error(error.response?.data?.message || "Google login failed. Please try again.");
      }
    };

    const handleGoogleError = () => {
      toast.error("Google login failed. Please try again.");
    };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Login</h1>
        <form className={styles.form} onSubmit={handlesubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" 
            id="email" 
            value={logindata.email}
              onChange={handlechange}
            placeholder="Enter your email" 
            required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={logindata.password}
              onChange={handlechange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        
        {/* Divider */}
        <div className={styles.divider}>
          {/* <span>OR</span> */}
        </div>
        
        {/* Google Login */}
        <div className={styles.googleLoginContainer}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
        </div>
        
        <p className={styles.footerText}>
          Not signed up yet?{" "}
          <span className={styles.signupLink} onClick={()=>navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
