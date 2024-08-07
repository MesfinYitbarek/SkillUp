import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';

function Reviews({ courseId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/review/${courseId}`);
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow-lg  p-6 mb-8 border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 font-lato">Course Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600 italic ">No reviews yet. Be the first to review this course!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="mb-4 border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg text-gray-800">{review.username}</span>
              <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                i < review.rating ? 
                <Star key={i} className="text-yellow-400" /> :
                <StarBorder key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.review}</p>
          </div>
        ))
      )}
      
      {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
    </div>
  );
}

export default Reviews;