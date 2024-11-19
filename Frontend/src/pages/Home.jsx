import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import {  useNavigate } from 'react-router-dom';
import styles from "../Styles/Home.module.css";
import Projects_card from '../Components/Projects_card';
import Ideas_card from '../Components/Ideas_cards';
import Blogs_card from '../Components/Blogs_card';
import Footer from '../Components/Footer';

function Home() {
  const [projects, setprojects] = useState([]);
  const [ideas, setideas] = useState([]);
  const [blogs, setblogs] = useState([])
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const navigate = useNavigate()
  
  const getprojects = async () => {
    try {
      const response = await axios.get("https://idealab-fwjb.onrender.com/api/v1/projects/getprojects");
      setprojects(response.data.slice(0,3)); 
    } catch (error) {
      console.log("Error while getting the projects", error.message);
    }
  };

  const getideas = async () => {
    try {
      const response = await axios.get("https://idealab-fwjb.onrender.com/api/v1/ideas/getideas");
      setideas(response.data.slice(0,3)); 
    } catch (error) {
      console.log("Error while getting the Ideas", error.message);
    }
  };

  const getblogs = async() =>{
    try {
      const response = await axios.get("https://dev.to/api/articles?tag=projects");
      setblogs(response.data.slice(5,8)); 
    } catch (error) {
      console.log("Error while getting the Blogs", error.message);
    }
  }

  useEffect(() => {
    getblogs();
    getprojects(); 
    getideas();
  }, []);

   const handlePostProject = () =>{
      if(isLoggedIn){
        navigate('/postproject')
      }else{
          toast.error("Please Login First")
          setTimeout(()=>{
            navigate('/login')
          },1500)
      }
   }

   const handlePostIdea = () =>{
    if(isLoggedIn){
      navigate('/postidea')
    }else{
        toast.error("Please Login First")
        setTimeout(()=>{
          navigate('/login')
        },1500)
    }
 }



  return (
    <>
      <div className={styles.hero_section_wrapper}>
        <div className={styles.hero_content}>
          <h1>Welcome to IdeaLab Innovating the Future with Creative Projects</h1>
          <p>Share your ideas, showcase your projects, and collaborate with like-minded individuals who complement your skills.</p>

          <div className={styles.buttons_container}>
            <button className={styles.projects_button}>
              <span onClick={handlePostProject}>Post Your Projects</span>
            </button>
            <button className={styles.ideas_button}>
              <span onClick={handlePostIdea}>Post Your Ideas</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.demo_projects_wrapper}>
          <h1>Projects</h1>
       <div className={styles.cards}>

       {projects.length > 0 ? (
          projects.map((project) => (
            <Projects_card key={project._id} project={project} /> 
          ))
        ) : (
          <div>No projects available</div> 
        )}
       </div>

        <div>
        <button className={styles.viewallbtn} onClick={()=> navigate('/projects')}>VIEW ALL</button>
        </div>

      </div>

      <div className={styles.demo_ideas_wrapper}>
          <h1>Ideas</h1>
       <div className={styles.cards}>

       {ideas.length > 0 ? (
          ideas.map((idea) => (
            <Ideas_card key={idea._id} Idea={idea} /> 
          ))
        ) : (
          <div>No Ideas available</div> 
        )}
       </div>

        <div>
        <button className={styles.viewallbtn} onClick={()=> navigate('/ideas')} >VIEW ALL</button>
        </div>

      </div>

      <div className={styles.demo_blogs_wrapper}>
          <h1>Tech Blogs and Project Ideas</h1>
       <div className={styles.cards}>

       {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blogs_card key={blog._id} blog={blog} /> 
          ))
        ) : (
          <div>No Blogs available</div> 
        )}
       </div>

        <div>
        <button className={styles.viewallbtn} onClick={() => navigate('/blog')}>VIEW ALL</button>
        </div>
        <ToastContainer />
      </div>

     <Footer/>
    </>
  );
}

export default Home;
