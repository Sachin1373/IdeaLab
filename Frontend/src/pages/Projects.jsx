import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Debounce from '../Utils/Debounce';
import styles from "../Styles/Project.module.css";
import Projects_card from '../Components/Projects_card';
import Spinner from '../Components/Spinner';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'open', 'closed'

  const getAllProjects = async () => {
    try {
      const response = await axios.get("https://idealab-1-backend.onrender.com/api/v1/projects/getprojects");
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

  const debouncedsearch = Debounce(searchTerm,1000)
  useEffect(() => {
    let filtered = projects;

    if (debouncedsearch) {
      filtered = filtered.filter((project) =>
        project?.title?.toLowerCase().includes(debouncedsearch.toLowerCase()) ||
        project?.techstack?.some((skill) =>
          skill.toLowerCase().includes(debouncedsearch.toLowerCase())
        )
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    setFilteredProjects(filtered);
  }, [debouncedsearch, filterStatus, projects]);

  return (
    <>
      <div className={styles.projectsContainer}>
        <h1>Projects</h1>

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
            <Spinner />
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
      </div>
    </>
  );
}

export default Projects;
