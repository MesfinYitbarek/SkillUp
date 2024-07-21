import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CachedIcon from "@mui/icons-material/Cached";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import SchoolIcon from "@mui/icons-material/School";
import { Star } from "@mui/icons-material";
import { FaClock } from "react-icons/fa6";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import CourseInfo from "./CourseInfo";
import Lesson from "./Lesson";
import Reviews from "./Reviews";

const contentData = {
  content1: <CourseInfo />,
  content2: <Lesson />,
  content3: <Reviews />,
};

function Test() {
  const [activeButton, setActiveButton] = useState(null);
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await fetch(`/api/enrollment/${courseId}`);
        const data = await response.json();
        setEnrollment(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEnrollment();
  }, [courseId]);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/courseDetails/${courseId}`);
      const data = await response.json();
      setCourse(data);

      const isEnrolledResponse = await fetch(`/api/enrollment/isEnrolled`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          courseId: courseId,
        }),
      });
      const isEnrolledData = await isEnrolledResponse.json();
      setIsUserEnrolled(isEnrolledData.isEnrolled);
    };

    fetchCourse();
  }, [courseId, currentUser.username]);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const handleEnrollment = async (e) => {
    try {
      setLoading(true);
      const res = await fetch("/api/enrollment/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          email: currentUser.email,
          courseId,
          instructor: course.instructor,
          courseName: course.title,
        }),
      });
      setLoading(false);
      setError(null);
      navigate(`/course-lesson/${courseId}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      navigate("/sign-in");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/review/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          courseId,
          review: userReview,
          rating: userRating,
        }),
      });
      if (response.ok) {
        setUserReview("");
        setUserRating(0);
        // Refresh reviews
        setActiveButton(3);
      } else {
        setError("Failed to submit review");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {course ? (
        <div className="flex-grow">
          <div className="bg-blue-900 text-white py-8 px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm mb-2">
                {course.catagory}
              </button>
              <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2">{course.title}</h1>
              <p className="opacity-75 mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <img
                    src={course.instructorImage}
                    alt="profile"
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <SchoolIcon className="mr-1" />
                  <span>{enrollment.length} Students</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="md:flex md:space-x-8">
              <div className="md:w-2/3">
                <img
                  src={course.imageUrl}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                  alt="course"
                />
                <div className="flex flex-wrap border-b mb-8">
                  {["Course Info", "Curriculum", "Reviews"].map((label, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(index + 1)}
                      className={`px-4 py-2 text-lg font-semibold ${
                        activeButton === index + 1
                          ? "border-b-2 border-blue-600 text-blue-800"
                          : "text-gray-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="mb-8">
                  {activeButton && 
                    (activeButton === 3 ? 
                      <Reviews courseId={courseId} /> : 
                      contentData[`content${activeButton}`]
                    )
                  }
                </div>
                {isUserEnrolled && (
                  <div className="bg-gray-100 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label className="block mb-2">Rating:</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`cursor-pointer ${
                                star <= userRating ? "text-yellow-400" : "text-gray-300"
                              }`}
                              onClick={() => setUserRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Review:</label>
                        <textarea
                          className="w-full p-2 border rounded"
                          rows="4"
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-800 text-white rounded-md px-4 py-2"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6 sticky top-4">
                  <div className="mb-4">
                    {course.isPaid ? (
                      <span className="text-blue-800 text-2xl font-bold">₹{course.price}</span>
                    ) : (
                      <span className="text-green-500 text-2xl font-bold">Free</span>
                    )}
                  </div>
                  {isUserEnrolled ? (
                    <button
                      onClick={() => navigate(`/course-lesson/${courseId}`)}
                      className="w-full bg-blue-800 text-white rounded-md px-4 py-2 mb-4"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={course.isPaid ? () => alert("Not available for now!") : handleEnrollment}
                      className="w-full bg-blue-800 text-white rounded-md px-4 py-2 mb-4"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Enroll Now"}
                    </button>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <AlignVerticalBottomIcon className="mr-2" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <SchoolIcon className="mr-2" />
                      <span>{enrollment.length} Students</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <CachedIcon className="mr-2" />
                      <span>
                        Last Updated{" "}
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700 py-8">Loading course details...</p>
      )}
      <Footer />
    </div>
  );
}

export default Test;