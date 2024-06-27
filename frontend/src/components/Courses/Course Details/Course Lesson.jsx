import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../Common/Header";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useSelector } from "react-redux";
import Footer from "../../Common/Footer";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
  const [progress, setProgress] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/lesson/${courseId}`);
        setLessons(response.data);
        if (response.data.length > 0) {
          setSelectedLesson(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonClick = async (lessonId) => {
    try {
      const response = await axios.get(`/api/lesson/${courseId}/${lessonId}`);
      setSelectedLesson(response.data);
      setProgress(0); // Reset progress when a new lesson is selected
    } catch (error) {
      console.error("Error fetching lesson:", error);
      if (error.response && error.response.status === 404) {
        alert("Lesson not found.");
      } else {
        alert("An error occurred while fetching the lesson.");
      }
    }
  };

  const handleVideoProgress = (event) => {
    const video = event.target;
    const percentWatched = (video.currentTime / video.duration) * 100;
    setProgress(Math.min(100, percentWatched));
  };

  const handleDocumentScroll = (event) => {
    const element = event.target;
    const percentScrolled =
      (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setProgress(Math.min(100, percentScrolled));
  };

  const isCompleted = progress >= 100;

  if (lessons.length === 0) {
    return <div className=" h-screen flex justify-center items-center   text-red-500 text-2xl "><h1 className=" shadow-md bg-slate-100 p-40">No lessons found for this course.</h1></div>;
  }

  return (
    <div className=" dark:bg-gray-800 dark:text-white  min-h-screen">
      <div className="  top-0 left-0 w-full bg-white z-10">
        <Header />
        <div className="relative bg-blue-800 h-1 z-50"></div>
      </div>
  <div className=" flex gap-3">
      <div className=" border-gray-300 bg-slate-100 z-10 p-4 dark:bg-gray-500 dark:text-white overflow-y-scroll">
        <h1>{}</h1>
        {lessons.map((lesson, index) => (
          <div>
            <button
              key={index}
              onClick={() => handleLessonClick(lesson._id)}
              className={`block w-full text-left py-2 px-2 text-sm rounded-md hover:bg-gray-200 ${
                selectedLesson && selectedLesson._id === lesson._id
                  ? "text-white font-bold bg-blue-800 hover:bg-blue-900"
                  : ""
              }`}
            >
              <DoneAllIcon className="mr-1" /> {lesson.title}
            </button>
          </div>
        ))}
        <div className=" flex flex-col gap-5  font-bold mt-5">
          <Link to={`/course/${courseId}/grades`} className=" bg-blue-800 p-1 rounded-md text-white text-center" >Grade</Link>
          <Link className=" bg-blue-800 p-1 rounded-md text-white text-center ">Assesment</Link>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center mx-auto ">
        {selectedLesson && (
          <div key={selectedLesson._id} className="mb-6">
            <div className="flex gap-14">
              <div className="my-10 flex flex-col justify-center">
                <div className="my-4">
                  {isCompleted ? (
                    <div className="text-green-500 text-xl font-bold">
                      Completed
                    </div>
                  ) : (
                    <div className="text-blue-800 rounded-md w-[30%]  p-1 px-4 border-2 border-blue-800 text-xl font-bold">
                      Progress: {Math.round(progress)}%
                    </div>
                  )}
                </div>

                <div>
                  <video
                    className=" h-[360px] w-[800px]"
                    width="800"
                    height="360"
                    controls
                    onTimeUpdate={handleVideoProgress}
                  >
                    <source src={selectedLesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h2 className="text-3xl font-bold my-4">
                  {selectedLesson.title}
                </h2>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Note" {...a11yProps(0)} />
                      <Tab label="Item Two" {...a11yProps(1)} />
                      <Tab label="  Discuss" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <div className="my-4">
                      <div
                        className="border p-4 w-[750px]  overflow-y-auto"
                        onScroll={handleDocumentScroll}
                        dangerouslySetInnerHTML={{
                          __html: selectedLesson.content,
                        }}
                      />
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    Item Two
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <DiscussionForum lessonId={selectedLesson._id} />
                  </CustomTabPanel>
                </Box>

                <div className="flex">
                  <Link
                    to={`/lessons/${courseId}/${selectedLesson._id}/quiz`} 
                    className=" sticky bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Quiz
                  </Link>
                  <Link
                    to={`/lessons/${selectedLesson._id}/assignment`}
                    className=" sticky bg-blue-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Assignment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CourseLesson;
