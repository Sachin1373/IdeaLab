import React from 'react';
import styles from '../Styles/Projects_card.module.css';

function Ideas_card({ Idea }) {
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.active_close}>
         <p className={Idea?.status === 'concept' ? styles.concept : styles.brainstorming}>{Idea?.status}</p>
      </div>
      <div className={styles.heading}>
        <p>{Idea?.title}</p>
      </div>
      <div className={styles.disctription}>
        <p>{Idea?.description?.substr(0, 100).concat("...")}</p>
      </div>
      <div className={styles.skills}>
        {Idea?.techstack?.map((skill, key) => (
          <li key={key} className={styles.skill}>{skill}</li>
        ))}
      </div>
      <div className={styles.card_bottom}>
        <div className={styles.viewbtn}>
          <button>View Ideas</button>
        </div>
      </div>
    </div>
  );
}

export default Ideas_card;
