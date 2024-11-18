import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/Blogs.module.css";
import Blogs_card from "../Components/Blogs_card";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Show 6 blogs initially

  const getBlogs = async () => {
    try {
      const response = await axios.get("https://dev.to/api/articles?tag=projects");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error while getting the Blogs", error.message);
    }
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisible) => prevVisible + 6); // Load 6 more blogs on each click
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <h1 className={styles.heading}>All Blogs</h1>
      <div className={styles.blogWrapper}>
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <Blogs_card key={blog.id} blog={blog} />
        ))}
      </div>
      {visibleBlogs < blogs.length && (
        <button className={styles.loadMoreBtn} onClick={loadMoreBlogs}>
          Load More
        </button>
      )}
    </div>
  );
}

