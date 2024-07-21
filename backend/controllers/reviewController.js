import Review from "../models/Review.js";
import Course from "../models/Course.js";

// Get reviews for a course
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add a new review
export const createReviews = async (req, res) => {
    const { username, courseId, review, rating } = req.body;
  
    try {
      // Create and save the new review
      const newReview = new Review({
        username,
        courseId,
        review,
        rating,
      });
      const savedReview = await newReview.save();
  
      // Update the course with the new review, rating, and increment reviewCount
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Calculate new average rating
      const allReviews = await Review.find({ courseId });
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allReviews.length;
  
      // Update the course
      course.review = review;
      course.rating = averageRating;
      course.reviewCount = allReviews.length; // Set the reviewCount
      await course.save();
  
      res.status(201).json({
        review: savedReview,
        courseUpdate: { review, rating: averageRating, reviewCount: allReviews.length }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };