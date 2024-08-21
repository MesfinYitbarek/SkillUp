import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../Common/Header";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, useMediaQuery, CircularProgress } from "@mui/material";
import DiscussionForum from "./Lesson/DiscussionForum";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseLesson = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [value, setValue] = React.useState(0);
  const notesRef = useRef(null);
  const notesTimerRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      // Start timer when Notes tab is selected
      startNotesTimer();
    } else {
      // Stop timer when switching away from Notes tab
      stopNotesTimer();
    }
  };

  useEffect(() => {
    if (overallProgress === 100) {
      saveCompletedCourse();
    }
  }, [overallProgress]);
  
  const saveCompletedCourse = async () => {
    try {
      await axios.post('/api/completed-courses', {
        userId: currentUser._id,
        courseId
      });
    } catch (error) {
      console.error("Error saving completed course:", error);
    }
  };
  
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/lesson/${courseId}`);
        setLessons(response.data);
        if (response.data.length > 0) {
          setSelectedLesson(response.data[0]);
        }

        // Fetch user's progress for this course
        const progressResponse = await axios.get(
          `/api/progress/${currentUser._id}/${courseId}`
        );
        setProgress(progressResponse.data);
        calculateOverallProgress(progressResponse.data, response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();

    // Clean up timer on component unmount
    return () => {
      if (notesTimerRef.current) {
        clearInterval(notesTimerRef.current);
      }
    };
  }, [courseId, currentUser._id]);

  const calculateOverallProgress = (progressData, lessonsData) => {
    if (lessonsData.length === 0) return;

    const totalTasks = lessonsData.length * 4; // 4 tasks per lesson (video, notes, quiz, assignment)
    let completedTasks = 0;

    lessonsData.forEach(lesson => {
      const lessonProgress = progressData[lesson._id] || {};
      completedTasks += Object.values(lessonProgress).filter(value => value === 100).length;
    });

    const overallPercentage = (completedTasks / totalTasks) * 100;
    setOverallProgress(Math.round(overallPercentage));
  };

  const handleLessonClick = async (lessonId) => {
    try {
      const response = await axios.get(`/api/lesson/${courseId}/${lessonId}`);
      setSelectedLesson(response.data);
      // Reset the notes timer when changing lessons
      stopNotesTimer();
      if (value === 0) {
        startNotesTimer();
      }
    } catch (error) {
      console.error("Error fetching lesson:", error);
      if (error.response && error.response.status === 404) {
        alert("Lesson not found.");
      } else {
        alert("An error occurred while fetching the lesson.");
      }
    }
  };

  const handleVideoProgress = async (event) => {
    const video = event.target;
    const percentWatched = (video.currentTime / video.duration) * 100;

    await updateProgress(selectedLesson._id, "video", percentWatched);
  };

  const startNotesTimer = () => {
    if (notesTimerRef.current) {
      clearInterval(notesTimerRef.current);
    }
    
    const startTime = Date.now();
    const totalTime = 600; 

    notesTimerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const percentComplete = Math.min((elapsedTime / totalTime) * 100, 100);
      
      updateProgress(selectedLesson._id, "notes", percentComplete);

      if (percentComplete >= 100) {
        stopNotesTimer();
      }
    }, 1000); // Update every second
  };

  const stopNotesTimer = () => {
    if (notesTimerRef.current) {
      clearInterval(notesTimerRef.current);
    }
  };

  const updateProgress = async (lessonId, type, value) => {
    try {
      const response = await axios.post(
        `/api/progress/${currentUser._id}/${courseId}/${lessonId}`,
        {
          type,
          value,
        }
      );
      setProgress((prevProgress) => ({
        ...prevProgress,
        [lessonId]: {
          ...prevProgress[lessonId],
          [type]: value,
        },
      }));
      calculateOverallProgress({...progress, [lessonId]: {...progress[lessonId], [type]: value}}, lessons);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const isLessonCompleted = (lessonId) => {
    const lessonProgress = progress[lessonId];
    return (
      lessonProgress &&
      lessonProgress.video === 100 &&
      lessonProgress.notes === 100 &&
      lessonProgress.quiz === 100 &&
      lessonProgress.assignment === 100
    );
  };

  const isCompleted = progress >= 100;

  if (lessons.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 text-2xl">
        <h1 className="shadow-md bg-slate-100 p-40">
          No lessons found for this course.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 dark:text-white font-lato">
      <Header />
      <div className="relative bg-blue-800 h-2 z-50"></div>

      <div className={`container mx-auto px-4 py-8 ${isMobile ? "flex-col" : "flex gap-8"}`}>
        <aside className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 ${isMobile ? "mb-8" : "w-1/4"}`}>
          <h2 className="text-2xl font-bold mb-4 font-lato ">Course cotent</h2>
          <div className="mb-4 flex items-center justify-between">
            <span className=" text-blue-800 text-lg font-bold font-lato">Overall Progress:</span>
            <div className="relative inline-flex">
              <CircularProgress
                variant="determinate"
                value={overallProgress}
                size={40}
                thickness={4}
                style={{ color: '#3B82F6' }}
              />
              <Typography
                variant="caption"
                component="div"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {`${overallProgress}%`}
              </Typography>
            </div>
          </div>
          <nav>
            {lessons.map((lesson, index) => (
              <button
                key={index}
                onClick={() => handleLessonClick(lesson._id)}
                className={`block w-full text-left py-3 px-4 mb-2 rounded-md transition-colors duration-200 ${
                  selectedLesson && selectedLesson._id === lesson._id
                    ? "bg-blue-800 text-white"
                    : "hover:bg-gray-400 dark:hover:bg-gray-600 bg-gray-200"
                }`}
              >
                {isLessonCompleted(lesson._id) ? (
                  <DoneAllIcon className="mr-2" />
                ) : null}{" "}
                {lesson.title}
              </button>
            ))}
          </nav>
          <div className="mt-8 space-y-4">
            <Link
              to={`/course/${courseId}/grades`}
              className="block w-full bg-blue-800 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Grade
            </Link>
            
          </div>
        </aside>

        <main
          className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 ${
            isMobile ? "w-full" : "w-3/4"
          }`}
        >
          {selectedLesson && (
            <div key={selectedLesson._id}>
              <h1 className="text-3xl font-bold mb-6">
                {selectedLesson.title}
              </h1>

              <div className="mb-6">
                {isLessonCompleted(selectedLesson._id) ? (
                  <div className="text-green-500 text-xl font-bold">
                    Completed
                  </div>
                ) : (
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full py-2 px-4 inline-block">
                    In Progress
                  </div>
                )}
              </div>

              <div className="aspect-w-16 aspect-h-9 mb-8">
                <video
                  className="w-full h-full rounded-lg shadow-lg"
                  controls
                  onTimeUpdate={handleVideoProgress}
                >
                  <source src={selectedLesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="lesson tabs"
                  >
                    <Tab label="Resources" {...a11yProps(0)} />
                    <Tab label="Notes" {...a11yProps(1)} />
                    <Tab label="Discussion" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                
                <CustomTabPanel value={value} index={0}>
                  <h3 className="text-xl font-semibold mb-4">
                    Additional Resources
                  </h3>
                  <ul className="list-disc pl-5">
                    <li>
                      <a href="#" className="text-blue-800 hover:underline">
                        Supplementary Reading
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-800 hover:underline">
                        Practice Exercises
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-800 hover:underline">
                        Related Articles
                      </a>
                    </li>
                  </ul>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div
                    ref={notesRef}
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <DiscussionForum lessonId={selectedLesson._id} />
                </CustomTabPanel>
              </Box>

              <div className="mt-8 flex space-x-4">
                <Link
                  to={`/lessons/${courseId}/${selectedLesson._id}/quiz`}
                  className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
                  onClick={() =>
                    updateProgress(selectedLesson._id, "quiz", 100)
                  }
                >
                  Take Quiz
                </Link>
                <Link
                  to={`/lessons/${selectedLesson._id}/assignment`}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
                  onClick={() =>
                    updateProgress(selectedLesson._id, "assignment", 100)
                  }
                >
                  View Assignment
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseLesson;
