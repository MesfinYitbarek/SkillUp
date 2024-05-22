import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Lesson = () => {
  const [course, setCourse] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/courseDetails/${courseId}`);
      const data = await response.json();
      setCourse(data);
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="text-sky-900">
      <h1 className="text-2xl font-bold pb-9">Course Curriculum</h1>
      {course ? (
        <div>
          {course.curriculum && (
            <>
              {course.curriculum.map((lesson, index) => (
                <Accordion
                  key={index}
                  sx={{ border: "1px solid #F5F5F5", marginY: "15px" }}
                >
                  <AccordionSummary
                    sx={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #F5F5F5",
                      padding: "6px",
                      paddingLeft: "30px",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography>{lesson.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{lesson.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
          {/* Display message if curriculum is not found */}
          {!course.curriculum && <p>Course curriculum not available.</p>}
        </div>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default Lesson;
