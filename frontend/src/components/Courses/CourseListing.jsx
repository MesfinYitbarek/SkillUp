import React, { useState, useEffect, useMemo, useCallback } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const COURSES_PER_PAGE = 6;

const CourseListing = ({
  search,
  filtered,
  courses,
  filteredCourses,
  searchTerm,
  catagorizedCourses,
  selectedCategories,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [page, setPage] = useState(1);

  const allCourses = useMemo(() => {
    if (searchQuery) {
      return courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (search) return filtered;
    if (categoryName) return courses.filter((course) => course.catagory.includes(categoryName));
    if (searchTerm) return filteredCourses;
    if (selectedCategories.length) return catagorizedCourses;
    return courses;
  }, [searchQuery, search, filtered, categoryName, courses, searchTerm, filteredCourses, selectedCategories, catagorizedCourses]);

  const sortedCourses = useMemo(() => {
    if (sortBy === "") return allCourses;
    return [...allCourses].sort((a, b) => {
      const compareResult = a[sortBy] > b[sortBy] ? 1 : -1;
      return sortOrder === "asc" ? compareResult : -compareResult;
    });
  }, [allCourses, sortBy, sortOrder]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    const timer = setTimeout(() => {
      try {
        const newCourses = sortedCourses.slice(0, page * COURSES_PER_PAGE);
        setDisplayedCourses(newCourses);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching courses. Please try again.");
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [sortedCourses, page]);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
    setPage(1);
    setDisplayedCourses([]);
  }, []);

  const handleSortOrderChange = useCallback((event) => {
    setSortOrder(event.target.value);
    setPage(1);
    setDisplayedCourses([]);
  }, []);

  const handleToggleDescription = useCallback((courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  }, []);

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {error}
      </p>
    );
  }

  return (
    <div className="pr-4 dark:bg-gray-800">
      <div className="container mx-auto px-4 pb-8">
        <h2 className="dark:text-white text-3xl text-blue-800 font-semibold sm:mb-24 mb-8 text-center">
          {searchQuery 
            ? `Search Results for "${searchQuery}"`
            : categoryName 
              ? `Courses in ${categoryName}`
              : "Explore Our Courses"}
        </h2>

        <div className="dark:text-white flex justify-between items-center mb-4">
          <FormControl variant="outlined" className="w-24 mr-4">
            <InputLabel className="dark:text-white">Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
              className="dark:text-white"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="createdAt">Newest</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel className="dark:text-white">Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Order"
              className="dark:text-white"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedCourses.map((course) => (
            <CourseCard 
              key={course._id} 
              course={course} 
              expandedCourse={expandedCourse} 
              handleToggleDescription={handleToggleDescription} 
            />
          ))}
        </div>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && displayedCourses.length < sortedCourses.length && (
          <div className="flex justify-center mt-8">
            <Button variant="contained" color="primary" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
const CourseCard = React.memo(({ course, expandedCourse, handleToggleDescription }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
    <Link to={`/courseDetails/${course._id}`} className="flex-shrink-0">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
    </Link>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold dark:text-white mb-2 line-clamp-2">
        {course.title}
      </h3>
      
      <p className="text-gray-600 cursor-pointer dark:text-gray-300 mb-4 flex-grow">
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
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/courseDetails/${course._id}`}
          className="inline-block px-3 py-1.5 border-blue-800 border text-blue-800 font-bold rounded"
        >
          Details
        </Link>
        <span>
          <StarIcon className="text-yellow-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            {Number(course.rating).toFixed(1)} ({course.reviewCount} reviews)
          </span>
        </span>
      </div>
    </div>
  </div>
));

export default CourseListing;