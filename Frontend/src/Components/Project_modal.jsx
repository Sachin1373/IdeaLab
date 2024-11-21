import React, { useEffect, useRef, useState } from 'react';
import { FaUserGroup } from "react-icons/fa6";
import styles from "../Styles/Project_modal.module.css";

function Project_modal({ project, onClose }) {
  const modalRef = useRef();
  const [joindesable,setjoindesable] = useState(false)

  useEffect(() => {
    if (project?.status === "closed") {
      setjoindesable(true);
    } else {
      setjoindesable(false);
    }
  }, [project]);

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


  const handleJoin = () => {
    const subject = `Request to Join: ${project?.title}`;
    const body = `Hello,\n\nI am interested in joining your project "${project?.title}". Please let me know how I can contribute.\n\nThank you!`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      project?.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    
    window.open(gmailLink, "_blank");
  };

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
          <button
            className={`${styles.joinBtn} ${joindesable ? styles.disabled : ''}`}
            onClick={handleJoin}
            disabled={joindesable}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project_modal;
