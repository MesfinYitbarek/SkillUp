import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Grades = () => {
  const { courseId } = useParams();
  const [grades, setGrades] = useState([]);
  const {currentUser} = useSelector((state)=> state.user)
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`/api/scores/${currentUser._id}/${courseId}`);
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  }, [courseId]);

  if (grades.length === 0) {
    return <div>No grades available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Grades</h2>
      <ul>
        {grades.map((grade, index) => (
          <li key={index} className="mb-2">
            <span className="font-bold">Lesson:</span> {grade.lessonId.title} - <span className="font-bold">Score:</span> {grade.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grades;