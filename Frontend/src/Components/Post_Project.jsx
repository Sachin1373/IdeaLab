import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from 'axios';
import styles from "../Styles/Post_Project.module.css";

function Post_Project() {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: '', 
    status: 'open', 
    maxTeamSize: '',
    currentTeamSize: '',
    creatorName: username || '',
    email: '',
    
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      techstack: formData.techstack.split(',').map((item) => item.trim()) 
    };
     
    setLoading(true);


    try {
        const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/projects/addproject",
          projectData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        toast.success(response?.data?.message || "Something went wrong! Please try again.")
        setTimeout(()=>{
          navigate('/')
        },1200)
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong! Please try again.")
    }finally {
      
      setLoading(false);
    }
    
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Post a Project</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Enter project description"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="techstack" className={styles.label}>Tech Stack</label>
          <input
            type="text"
            id="techstack"
            name="techstack"
            value={formData.techstack}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter tech stack (comma separated)"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxTeamSize" className={styles.label}>Max Team Size</label>
          <input
            type="number"
            id="maxTeamSize"
            name="maxTeamSize"
            value={formData.maxTeamSize}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter max team size"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="currentTeamSize" className={styles.label}>Current Team Size</label>
          <input
            type="number"
            id="currentTeamSize"
            name="currentTeamSize"
            value={formData.currentTeamSize}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter current team size"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="creatorName" className={styles.label}>Creator Name (Username)</label>
          <input
            type="text"
            id="creatorName"
            name="creatorName"
            value={username}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
                   <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter your email"
                        required
                    />
          </div>

    
        <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? "Posting..." : "Submit Idea"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Post_Project;
