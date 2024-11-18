import React from "react";
import styles from "../Styles/Blogs_card.module.css";

function Blogs_card({ blog }) {
  return (
    <div className={styles.card}>
      <img
        src={blog?.cover_image || blog?.social_image}
        alt={blog?.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{blog?.title}</h2>
        <p className={styles.description}>{blog?.description.substr(0,150).concat("...")}</p>
        <p className={styles.author}>
          <strong>Author:</strong> {blog?.user?.name}
        </p>
        <p className={styles.date}>
          <strong>Published:</strong> {blog?.readable_publish_date}
        </p>
        <button
          className={styles.readButton}
          onClick={() => window.open(blog?.url, "_blank")}
        >
          Read
        </button>
      </div>
    </div>
  );
}

export default Blogs_card;
