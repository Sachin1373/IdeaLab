import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify"; 
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"; 
import axios from 'axios';
import styles from "../Styles/Post_Idea.module.css";

function Post_Idea() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: '', // We'll split this later into an array
    status: 'concept', // Default value
    creatorName: username, 
    email: '',
  });

 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure creatorName is filled in
    if (!formData.creatorName) {
      toast.error("Username is required to post an idea!");
      return;
    }

    // Prepare the techstack as an array
    const ideaData = {
      ...formData,
      techstack: formData.techstack.split(',').map(item => item.trim()) 
    };

    setLoading(true);

    try {
     
      const response = await axios.post("https://idealab-1-backend.onrender.com/api/v1/ideas/addidea", 
        ideaData,
         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message || "Idea posted successfully!");
      setTimeout(()=>{
        navigate('/')
      },1200)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    }finally {
      
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Post an Idea</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Idea Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your idea title"
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
            placeholder="Enter your idea description"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="techstack" className={styles.label}>Tech Stack (comma separated)</label>
          <input
            type="text"
            id="techstack"
            name="techstack"
            value={formData.techstack}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter tech stack for the idea"
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
            <option value="concept">Concept</option>
            <option value="brainstorming">Brainstorming</option>
          </select>
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
            type="text"
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

export default Post_Idea;
