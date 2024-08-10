import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Grades = () => {
  const { courseId } = useParams();
  const [grades, setGrades] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          `/api/scores/${currentUser._id}/${courseId}`
        );
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  }, [courseId, currentUser._id]);

  const calculateSum = () =>
    grades.reduce((acc, grade) => acc + grade.score, 0);
  const calculateAverage = () =>
    grades.length ? calculateSum() / grades.length : 0;
  const determineLetterGrade = (average) => {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
  };

  const sum = calculateSum();
  const average = calculateAverage();
  const letterGrade = determineLetterGrade(average);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 font-lato">
        {grades.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            No grades available.
          </div>
        ) : (
          <div>
            <table className="min-w-full bg-white border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                
                <tr className="bg-gradient-to-r text-lg from-blue-500 to-indigo-500 text-white">
                  <th className="py-3 px-5 font-semibold">Lesson</th>
                  <th className="py-3 px-5 font-semibold">Quiz</th>
                  <th className="py-3 px-5 font-semibold">Assignment</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <tr key={index} className=" text-center even:bg-gray-100 odd:bg-white">
                    <td className="py-3 px-5">{grade.lessonId.title}</td>
                    <td className="py-3 px-5">{grade.score}</td>
                    <td className="py-3 px-5">assign</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 p-6  bg-gray-100 rounded-lg shadow-md">
              <p className="text-lg font-bold">Total Score: {sum}</p>
              <p className="text-lg font-bold">
                Average Score: {average.toFixed(2)}
              </p>
              <p className="text-lg font-bold">Grade: {letterGrade}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Grades;
