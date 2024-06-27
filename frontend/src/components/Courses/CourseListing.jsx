import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const CourseListing = ({
  search,
  filtered,
  courses,
  filteredCourses,
  searchTerm,
  catagorizedCourses,
  selectedCategories,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (error) {
        setError(
          "Error fetching courses. Please check your network connection and try again."
        );
      }
    }, 1000);
  }, [searchTerm,search,filtered, selectedCategories, catagorizedCourses, sortBy, sortOrder]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter courses based on categoryName, searchTerm, or selectedCategories
  const displayCourses = search ? filtered : categoryName
    ? courses.filter((course) => course.catagory.includes(categoryName))
    : searchTerm
    ? filteredCourses
    : selectedCategories.length
    ? catagorizedCourses
    : courses;

  // Sort courses based on sortBy and sortOrder
  const sortedCourses = [...displayCourses].sort((a, b) => {
    if (sortBy === "") return 0;
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const handleToggleDescription = (courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const slicedCourses = sortedCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className="pr-4 dark:bg-gray-800">
      <div className="container mx-auto px-4 pb-8">
        <h2 className="dark:text-white text-3xl text-blue-800 font-semibold sm:mb-24 mb-8 text-center">
          Explore Our Courses
        </h2>

        {error ? (
          <p className="text-red-500 text-center">
            Error fetching courses. Please check your network connection and try again.
          </p>
        ) : isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className=" dark:text-white flex justify-between items-center mb-4">
              <FormControl variant="outlined" className="  w-24 mr-4">
                <InputLabel className=" dark:text-white">Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                  className=" dark:text-white"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="createdAt">Newest</MenuItem>
                </Select>
              </FormControl>
              <FormControl   variant="outlined">
                <InputLabel className="dark:text-white">Order</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  label="Order" className=" dark:text-white " >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {slicedCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <Link to={`/courseDetails/${course._id}`}>
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold dark:text-white  mb-2">
                      {course.title}
                    </h3>
                
                    
                    <p className="text-gray-600 cursor-pointer dark:text-gray-300 mb-4">
                    {expandedCourse === course._id ? (
                      <span onClick={() => handleToggleDescription(course._id)}>
                        {course.description}
                      </span>
                    ) : (
                      <span
                        className="line-clamp-2"
                        onClick={() => handleToggleDescription(course._id)}
                      >
                        {course.description}
                        {course.description.length > 100 && (
                          <span className="text-blue-500 cursor-pointer">
                            ...Read more
                          </span>
                        )}
                      </span>
                    )}
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
                      <div className=" flex justify-between items-center">
                        <Link
                          to={`/courseDetails/${course._id}`}
                          className="inline-block px-3 py-1.5 border-blue-800 border  text-blue-800 font-bold rounded mt-4"
                        >
                          Details
                        </Link>
                        <span>
                        <StarIcon className="text-yellow-500" />
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        {course.rating} ({course.reviewCount} reviews)
                      </span>
                        </span>
                      </div>
                    
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Pagination
                count={Math.ceil(displayCourses.length / coursesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseListing;