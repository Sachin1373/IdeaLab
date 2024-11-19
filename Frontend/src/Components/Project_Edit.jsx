import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../Styles/Post_Project.module.css";

function Project_Edit() {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const project = location.state;
  
 
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techstack: '',
    status: 'open',
    maxTeamSize: '',
    currentTeamSize: '',
    creatorName: username || '',
  });


  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        techstack: project?.techstack?.join(', '), 
        creatorName: username || '',
      });
    }
  },[project,username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      techstack: formData.techstack.split(',').map((item) => item.trim()),
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/projects/update/${project._id}`,
        projectData
      );
      toast.success(response?.data?.message || "Project updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Project</h1>
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
            <option value="open">open</option>
            <option value="closed">closed</option>
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
            value={formData.creatorName}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your username"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Submit Project</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Project_Edit;
