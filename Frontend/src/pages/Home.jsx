import React from 'react';
import styles from "../Styles/Home.module.css";

function Home() {
  return (
    <>
    <div className={styles.hero_section_wrapper}>
      {/* Hero Section */}
      <div className={styles.hero_content}>
        <h1>Welcome to IdeaLab Innovating the Future with Creative Projects</h1>
        <p>Share your ideas, showcase your projects, and collaborate with like-minded individuals who complement your skills.</p>
        
        {/* Buttons for navigation */}
        <div className={styles.buttons_container}>
          <button className={styles.projects_button}>
            <a href="/projects">Post Your Projects</a>
          </button>
          <button className={styles.ideas_button}>
            <a href="/ideas">Post Your Ideas</a>
          </button>
        </div>
      </div>
    </div>

    <div className={styles.demo_projects_wrapper}>
        
    </div>
    </>
  );
}

export default Home;
