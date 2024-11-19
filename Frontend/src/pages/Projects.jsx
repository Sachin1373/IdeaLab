import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../Styles/Project.module.css";
import Projects_card from '../Components/Projects_card';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'open', 'closed'

  const getAllProjects = async () => {
    try {
      const response = await axios.get("https://idealab-fwjb.onrender.com/api/v1/projects/getprojects");
      setProjects(response.data);
      setFilteredProjects(response.data); // Set the filtered list initially to all projects
    } catch (error) {
      console.error("Error while getting the projects", error.message);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  // Filter projects based on search term and filter status
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.techstack?.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, filterStatus, projects]);

  return (
    <>
      <h1>All Projects</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title or skills..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className={styles.filterSelect}
        >
          <option value="all">All Projects</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className={styles.project_wrapper}>
        {isLoading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          filteredProjects.map((project) => (
            <Projects_card key={project.id} project={project} />
          ))
        )}
      </div>
    </>
  );
}

export default Projects;
