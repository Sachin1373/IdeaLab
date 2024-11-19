import React, { useEffect, useRef } from 'react';
import { FaUserGroup } from "react-icons/fa6";
import styles from "../Styles/Project_modal.module.css";

function Project_modal({ project, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <h1>{project?.title}</h1>
          <span className={styles.status}>{project?.status}</span>
        </div>
        <p className={styles.creatorName}>{project?.creatorName}</p>
        <div className={styles.body}>
          <h3>Tech Stack</h3>
          <ul className={styles.techStack}>
            {project?.techstack.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3>Description</h3>
          <p>{project?.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.team}>
            <FaUserGroup /> {project?.currentTeamSize}/{project?.maxTeamSize}
          </div>
          <button className={styles.joinBtn}>Join</button>
        </div>
      </div>
    </div>
  );
}

export default Project_modal;
