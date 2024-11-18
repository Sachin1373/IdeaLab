import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Styles/Footer.module.css';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h2>IdeaLab</h2>
          <p>Innovating the Future with Creative Projects</p>
        </div>

        <div className={styles.linksSection}>
          <NavLink to="/" className={styles.link} activeClassName={styles.activeLink}>
            Home
          </NavLink>
          <NavLink to="/projects" className={styles.link} activeClassName={styles.activeLink}>
            Projects
          </NavLink>
          <NavLink to="/ideas" className={styles.link} activeClassName={styles.activeLink}>
            Ideas
          </NavLink>
          <NavLink to="/blog" className={styles.link} activeClassName={styles.activeLink}>
            Blog
          </NavLink>
          <NavLink to="/login" className={styles.link} activeClassName={styles.activeLink}>
            Login
          </NavLink>
          <NavLink to="/signup" className={styles.link} activeClassName={styles.activeLink}>
            Signup
          </NavLink>
        </div>

        <div className={styles.socialMedia}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/in/sachin081/" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaLinkedin />
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; 2024 IdeaLab. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
