import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
const InstructorCourse = () => {
  const [courses, setCourses] = React.useState([]);
  const { loading, currentUser } = useSelector((state) => state.user);
  console.log(courses);
  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/courses/personalcourses/${currentUser._id}`
        );
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseDelete = async (courseid) => {
    try {
      const res = await fetch(`/api/courses/deletecourses/${courseid}`, {
        method: "DELETE",
      });
      const data = await res.json();
  
      if (data.success === false) {
        console.log(data.message); // Handle deletion error (optional)
        return;
      }
  
      setCourses((prev) => {
        console.log("Filtered courses:", prev.filter((courses) => courses._id !== courseid));
        return prev.filter((courses) => courses._id !== courseid);
      });
  
    } catch (error) {
      console.error(error.message); // Handle errors (optional)
    }
  };

  return (
    <div className=" px-16 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h2 className=" dark:text-white text-4xl text-sky-800 font-semibold sm:mb-24 mb-8 text-center ">
          My Courses
        </h2>
        
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses && courses.length > 0 && courses.map((course) => (
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                key={course.id}
                className=" rounded-2xl border border-slate-300 overflow-hidden  hover:bg-purple-300 shadow-purple-400 p-4 "
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="px-3 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium odd:bg-purple-300 even:bg-pink-300 px-2 py-[3px] rounded">
                      {course.title}
                    </h3>
                    <img
                      src={course.instructorImage}
                      alt="Instructor"
                      className=" relative -top-9 right-1 w-12 h-12 rounded-full p-1 bg-white"
                    />
                  </div>
                  <p className=" dark:text-white  text-base font-semibold text-blue-950 mb-2">
                    {course.description}
                  </p>
  
                  <div className="flex justify-between items-center mt-2 mb-3">
                    <span className="dark:text-white text-gray-700 text-sm">
                      Duration: {course.duration}
                    </span>
  
                    {course.isPaid ? (
                      <span className="text-blue-600 font-bold">
                        &#8377; {course.price}
                      </span>
                    ) : (
                      <span className="text-green-500 font-bold">Free</span>
                    )}
                  </div>
  
                  <hr />
  
                  <div className=" flex justify-between items-center mt-3">
                    <a
                      href={`/courses/${course.id}`}
                      className="inline-block px-3 py-1.5  border-purple-500 border bg-red-50 text-purple-600 font-bold rounded "
                    >
                      Learn More
                    </a>
  
                    <span>
                      <StarIcon className=" text-yellow-400" />
                      <span className="text-gray-700 ml-1">{course.rating}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      disabled={loading}
                      onClick={() => handleCourseDelete(course._id)}
                      className="px-3 py-1.5  border-red-500 border bg-red-50 text-red-600 font-bold rounded mt-1"
                    >
                      {loading ? "Loading..." : "Delete"}
                    </button>
                    <button className=" px-3 py-1.5  border-blue-500 border bg-blue-50 text-blue-600 font-bold rounded mt-1">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        
      </div>
    </div>
  );
};

export default InstructorCourse;
