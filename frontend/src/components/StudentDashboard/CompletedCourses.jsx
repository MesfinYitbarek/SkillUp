// CompletedCourses.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress, Box, Pagination, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useSearch } from "../../SearchContext";

const CompletedCourses = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [completedCourses, setCompletedCourses] = useState([]);
  const { searchTerm } = useSearch();
  const [coursesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get(`/api/completed-courses/${currentUser._id}`);
        setCompletedCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching completed courses:", error);
        setError("Error fetching courses. Please check your network connection and try again.");
        setIsLoading(false);
      }
    };

    fetchCompletedCourses();
  }, [currentUser._id]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCourses = completedCourses.filter((data) => {
    const title = data.courseId.title || "";
    const description = data.courseId.description || "";
    
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedCourses = filteredCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (slicedCourses.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No completed courses found.
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {slicedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image={course.courseId.imageUrl}
                alt={course.courseId.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.courseId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.courseId.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="body2" bgcolor="action.hover" px={1} py={0.5} borderRadius={1}>
                    {course.courseId.duration}
                  </Typography>
                  <Typography variant="body1" color={course.courseId.isPaid ? "primary" : "success.main"} fontWeight="bold">
                    {course.courseId.isPaid ? `₹${course.courseId.price}` : "Free"}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Link to={`/course-lesson/${course.courseId._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="primary" fullWidth>
                      Review
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredCourses.length / coursesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CompletedCourses;