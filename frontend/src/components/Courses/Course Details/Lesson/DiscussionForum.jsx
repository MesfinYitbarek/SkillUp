import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import io from "socket.io-client";

const socket = io('http://localhost:4444');

const DiscussionForum = ({ lessonId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/discussion/${lessonId}`);
        setComments(response.data[0].comments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    socket.emit('joinLessonRoom', lessonId);

    socket.on('receiveComment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    return () => {
      socket.off('receiveComment');
    };
  }, [lessonId]);

  const handleNewComment = async (comment) => {
    const userId = currentUser._id;
    const newComment = { lessonId, userId, content: comment, createdAt: new Date() };
    
    setComments((prevComments) => [...prevComments, newComment]); // Optimistic update

    try {
      await axios.post(`/api/discussion/${lessonId}`, newComment);
      socket.emit('newComment', newComment);
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