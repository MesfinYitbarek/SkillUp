import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Grade = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/scores');
        setScores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="p-40">
      <h2>Your Grades</h2>
      {scores.length === 0 ? (
        <p>No grades available.</p>
      ) : (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              Lesson: {score.lessonId.title} - Score: {score.score} / {score.totalQuestions}
              Student: {score.userId.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Grade;