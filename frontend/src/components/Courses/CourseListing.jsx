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
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const CourseListing = ({
  courses,
  filteredCourses,
  searchTerm,
  categorizedCourses,
  selectedCategories,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState(null); // State to track sorting preference

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
  }, [searchTerm, selectedCategories, categorizedCourses, sortBy]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.checked ? "createdAt" : null); // Sort by created time if checkbox is checked, otherwise clear sorting
  };

  // Combine filtering logic and sorting
  const filteredAndSortedCourses = React.useMemo(() => {
    let displayCourses = categoryName
      ? courses.filter((course) => course.category.includes(categoryName))
      : searchTerm
      ? filteredCourses
      : selectedCategories.length
      ? categorizedCourses
      : courses;

    // Apply sorting only if sortBy is set
    if (sortBy === "createdAt") {
      displayCourses = [...displayCourses].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort by created time descending
    }

    return displayCourses.slice(
      coursesPerPage * (currentPage - 1),
      coursesPerPage * currentPage
    );
  }, [
    searchTerm,
    selectedCategories,
    categorizedCourses,
    courses,
    currentPage,
    coursesPerPage,
    sortBy,
    categoryName,
  ]);

  return (
    <div className="pr-4 dark:bg-gray-800">
      <div className="container mx-auto px-4 pb-8">
        <h2 className="dark:text-white text-3xl text-sky-800 font-semibold sm:mb-24 mb-8 text-center">
          Explore Our Courses
        </h2>

        {error ? (
          <p className="text-red-500 text-center">
            Error fetching courses. Please check your network connection and try
            again.
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
            <div className="flex justify-between items-center mb-4">
              <IconButton onClick={() => setSortBy(!sortBy)}>
                <SortIcon className="text-gray-700 hover:text-blue-500" />
              </IconButton>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sortBy === "createdAt"}
                      onChange={handleSortChange}
                    />
                  }
                  label="Sort by Newest"
                />
              </FormGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedCourses &&
                filteredAndSortedCourses.length > 0 &&
                filteredAndSortedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-300 overflow-hidden hover:bg-purple-300 shadow-purple-400 p-4 "
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="px-3 py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold  py-[3px] rounded">
                          {course.title}
                        </h3>
                        <img
                          src={course.instructorImage}
                          alt="Instructor"
                          className="relative -top-9 right-1 w-12 h-12 rounded-full p-1 bg-white"
                        />
                      </div>
                      <p className="dark:text-white text-base font-semibold text-blue-950 mb-2">
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

                      <div className=" flex justify-between items-center">
                        <Link
                          to={`/courseDetails/${course._id}`}
                          className="inline-block px-3 py-1.5 border-purple-500 border bg-red-50 text-purple-600 font-bold rounded mt-4"
                        >
                          Details
                        </Link>
                        <span>
                          <StarIcon className=" text-yellow-400" />
                          <span className="text-gray-700 ml-1">
                            {course.rating}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              {!filteredAndSortedCourses && <p>Course not available.</p>}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(
                  (searchTerm ? filteredCourses : courses).length /
                    coursesPerPage
                )}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseListing;
