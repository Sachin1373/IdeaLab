import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import styles from "../Styles/Ideas.module.css";
import Ideas_card from '../Components/Ideas_cards';

function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [visibleIdeas, setVisibleIdeas] = useState(6); // Initially show 6 ideas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getAllIdeas = async () => {
    try {
      const response = await axios.get("https://idealab-1-backend.onrender.com/api/v1/ideas/getideas");
      setIdeas(response.data);
    } catch (error) {
      console.error("Error while getting the ideas", error.message);
      setError("Failed to load ideas. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call immediately on mount
    getAllIdeas();
  
    // Set interval to call every 1 minute
    const interval = setInterval(() => {
      getAllIdeas();
    }, 1000); // 60000 ms = 1 minute
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setVisibleIdeas((prev) => prev + 6);
  };

  return (
    <div className={styles.ideasContainer}>
    <h1 className={styles.heading}>Ideas</h1>

     <div className={styles.ideasWrapper}>
      {isLoading ? (
          <div className={styles.spinnerWrapper}>
            <Spinner/>
          </div>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            <div className={styles.gridContainer}>
              {ideas.slice(0, visibleIdeas).map((idea) => (
                <Ideas_card key={idea.id} Idea={idea} />
              ))}
            </div>

            {visibleIdeas < ideas.length && (
              <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </>
        )}
     </div>
    </div>
  );
}

export default Ideas;
