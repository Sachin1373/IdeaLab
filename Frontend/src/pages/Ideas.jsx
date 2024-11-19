import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Styles/Ideas.module.css";
import Ideas_card from '../Components/Ideas_cards';

function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [visibleIdeas, setVisibleIdeas] = useState(6); // Initially show 6 ideas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getAllIdeas = async () => {
    try {
      const response = await axios.get("https://idealab-fwjb.onrender.com/api/v1/ideas/getideas");
      setIdeas(response.data);
    } catch (error) {
      console.error("Error while getting the ideas", error.message);
      setError("Failed to load ideas. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllIdeas();
  }, []);

  const handleLoadMore = () => {
    setVisibleIdeas((prev) => prev + 6); // Load 6 more ideas when clicked
  };

  return (
    <div className={styles.ideasContainer}>
      <h1 className={styles.heading}>All Ideas</h1>

      {isLoading ? (
        <p>Loading ideas...</p>
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
  );
}

export default Ideas;
