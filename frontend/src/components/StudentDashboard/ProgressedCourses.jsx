// ProgressedCourses.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress, Box, Pagination, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useSearch } from "../../SearchContext";

const ProgressedCourses = () => {
  const { searchTerm } = useSearch();
  const [course, setCourse] = useState([]);
  const [coursesPerPage] = useState(6);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch(
        `/api/courses/enrolledCourses/${currentUser.username}`
      );
      const data = await response.json();
      setCourse(data);
    };

    fetchCourseDetails();
  }, [currentUser]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCourses = course.filter(
    (data) =>
      data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        No progressed courses found.
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {slicedCourses.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data._id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image={data.imageUrl}
                alt={data.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {data.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="body2" bgcolor="action.hover" px={1} py={0.5} borderRadius={1}>
                    {data.duration}
                  </Typography>
                  <Typography variant="body1" color={data.isPaid ? "primary" : "success.main"} fontWeight="bold">
                    {data.isPaid ? `₹${data.price}` : "Free"}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Link to={`/course-lesson/${data._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="primary" fullWidth>
                      Continue
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

export default ProgressedCourses;