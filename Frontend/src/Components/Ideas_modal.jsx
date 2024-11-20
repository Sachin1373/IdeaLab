import React, { useEffect, useRef } from 'react';
import styles from "../Styles/Ideas_modal.module.css";

function Ideas_modal({ idea, onClose }) {
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

  const handleJoin = () => {
    const subject = `Request to Join: ${idea?.title}`;
    const body = `Hello,\n\nI am interested in Idea "${idea?.title}" and want to discuss  with you. Please let me know how I can contribute.\n\nThank you!`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      idea?.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    
    window.open(gmailLink, "_blank");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <h1>{idea?.title}</h1>
          <span className={styles.status}>{idea?.status}</span>
        </div>
        <p className={styles.creatorName}>{idea?.creatorName}</p>
        
        <div className={styles.body}>
          <p>{idea?.description}</p>
          <div className={styles.skills}>
             {idea?.techstack?.map((skill, key) => (
                <li key={key} className={styles.skill}>{skill}</li>
             ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.discussBtn} onClick={handleJoin}>Discuss</button>
        </div>
      </div>
    </div>
  );
}

export default Ideas_modal;
