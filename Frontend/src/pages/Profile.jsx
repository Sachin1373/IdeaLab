import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from 'axios'
import styles from "../Styles/Profile.module.css"
function Profile() {
  const [userprojects,setuserprojects] = useState([])
  const [userideas,setuserideas] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  
  
  const navigate = useNavigate()
  
  const username = localStorage.getItem("username") || "*****"
  const email = localStorage.getItem("email") || "******"


  const getUserProjects = async() =>{
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/projects/getproject/${username}`)
       setuserprojects(response.data)
    } catch (error) {
      console.log("error while fetching user project",error.message);
      
    }
  }

  const getUserIdeas = async() =>{
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/ideas/getidea/${username}`)
      setuserideas(response.data)
    } catch (error) {
      console.log("error while fetching user project",error.message);
      
    }
  }


  useEffect(()=>{
    if (isLoggedIn) {
      getUserProjects();
      getUserIdeas();
    }

  },[isLoggedIn])

  const Logout = () =>{
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    toast.success("Logged off successfully!.");
    setTimeout(()=>{
      navigate('/')
    },1500)

  }

  const handleprojectEdit = (project) =>{
     navigate('/postedit',{state:project})
  }
  
  const handleideaEdit = (idea) =>{
    navigate('/ideaedit',{state:idea})
  }

  const handleprojectDelete = async(project) =>{
    console.log("id : ",project._id);
    
     try {
      const response = await axios.delete(`http://localhost:8000/api/v1/projects/delete/${project._id}`)
      console.log(response);
      setuserprojects((prevProjects) =>
        prevProjects.filter((p) => p._id !== project._id)
      );
      
      toast.success(response.data.message)
     } catch (error) {
      toast.error(error)
     }
  }

  const handleideaDelete = async(idea) =>{

    
     try {
      const response = await axios.delete(`http://localhost:8000/api/v1/ideas/delete/${idea._id}`)
      console.log(response);
      setuserideas((previdea) =>
        previdea.filter((I) => I._id !== idea._id)
      );
      
      toast.success(response.data.message)
     } catch (error) {
      toast.error(error)
     }
  }

  

  return (
<div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className={styles.username}>{username}</h1>
        <p className={styles.email}>{email}</p>
      </div>

      {/* Projects Section */}
      <div className={styles.section}>
        <h2>Projects</h2>
        {userprojects.length > 0 ? (
          <ul className={styles.itemList}>
            {userprojects.map((project) => (
              <li key={project.id} className={styles.item}>
                <div>
                  <p>{project.title}</p>
                  <small>{project.description}</small>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleprojectEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleprojectDelete(project)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects posted yet.</p>
        )}
      </div>

      {/* Ideas Section */}
      <div className={styles.section}>
        <h2>Ideas</h2>
        {userideas.length > 0 ? (
          <ul className={styles.itemList}>
            {userideas.map((idea) => (
              <li key={idea.id} className={styles.item}>
                <div>
                  <p>{idea.title}</p>
                  <small>{idea.description}</small>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleideaEdit(idea)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleideaDelete(idea)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ideas posted yet.</p>
        )}
      </div>
      <div className={styles.logout}>
        <button onClick={Logout}>Log out</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile