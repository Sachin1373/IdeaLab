import React,{useState} from 'react';
import Project_modal from './Project_modal';
import { FaUserGroup } from "react-icons/fa6";
import styles from '../Styles/Projects_card.module.css';

function Projects_card({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.active_close}>
        <p className={project?.status === 'closed' ? styles.closed : styles.active}></p>{project?.status}
      </div>
      <div className={styles.heading}>
        <p>{project?.title}</p>
      </div>
      <div className={styles.disctription}>
        <p>{project?.description?.substr(0, 100).concat("...")}</p>
      </div>
      <div className={styles.skills}>
        {project?.techstack?.map((skill, key) => (
          <li key={key} className={styles.skill}>{skill}</li>
        ))}
      </div>
      <div className={styles.card_bottom}>
        <div className={styles.team}>
          <FaUserGroup /> {project?.currentTeamSize}/{project?.maxTeamSize}
        </div>
        <div className={styles.viewbtn}>
          <button onClick={handleModalOpen}>View project</button>
        </div>
      </div>
      {isModalOpen && (
        <Project_modal project={project} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default Projects_card;
