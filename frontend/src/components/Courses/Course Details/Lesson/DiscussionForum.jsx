import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment"; // Import moment.js for date formatting

const DiscussionForum = ({ lessonId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const commentIntervalRef = useRef(null); // Ref to hold interval ID

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get(`/api/discussion/${lessonId}`);
        setComments(response.data[0].comments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching/error
      }
    };

    fetchComments();

    // Clear any existing interval before setting a new one
    clearInterval(commentIntervalRef.current);

    // Set interval to fetch comments every 5 seconds
    commentIntervalRef.current = setInterval(fetchComments, 5000);

    return () => clearInterval(commentIntervalRef.current); // Clear interval on cleanup
  }, [lessonId]);

  const { currentUser } = useSelector((state) => state.user);

  const handleNewComment = async (comment) => {
    const userId = currentUser._id;
    setComments([...comments, { userId, content: comment }]); // Optimistic update

    try {
      const response = await axios.post(`/api/discussion/${lessonId}`, {
        userId,
        content: comment,
      });
      // Update state with actual response data (if needed)
    } catch (error) {
      console.error(error);
      // Handle errors (optional: remove comment from state)
    }
  };

  return (
    <div className="discussion-forum telegram-style">
      <h2>Discussion</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment._id} className="telegram-message">
                <div className="message-header">
                  <span className="username">{comment.userId.username}</span>
                  <span className="date">
                    {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <p className="message-content">{comment.content}</p>
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      )}
      <CommentForm onSubmit={handleNewComment} />
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(commentText);
    setCommentText(""); // Clear comment input after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Write your comment..."
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default DiscussionForum;
