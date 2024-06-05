import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import io from "socket.io-client";

const socket = io("http://localhost:4444");

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

    socket.emit("joinLessonRoom", lessonId);

    socket.on("receiveComment", (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    socket.on("receiveReply", (reply) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === reply.parentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        )
      );
    });

    return () => {
      socket.off("receiveComment");
      socket.off("receiveReply");
    };
  }, [lessonId]);

  const handleNewComment = async (comment) => {
    const userId = currentUser._id;
    const newComment = {
      lessonId,
      userId,
      content: comment,
      createdAt: new Date(),
    };

    setComments((prevComments) => [...prevComments, newComment]); // Optimistic update

    try {
      await axios.post(`/api/discussion/${lessonId}`, newComment);
      socket.emit("newComment", newComment);
    } catch (error) {
      console.error(error);
      
    }
  };

  const handleNewReply = async (parentId, reply) => {
    const userId = currentUser._id;
    const newReply = {
      parentId,
      userId,
      content: reply,
      createdAt: new Date(),
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === parentId
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    ); // Optimistic update

    try {
      await axios.post(`/api/discussion/reply/${parentId}`, newReply);
      socket.emit("newReply", newReply);
    } catch (error) {
      console.error(error);
      // Handle errors (optional: remove reply from state)
    }
  };

  return (
    <div className="">
      <h2 className=" mb-6">Discussion</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul className=" flex flex-col gap-3">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment._id} className="">
                <div className=" flex gap-2 items-center ">
                  <span>
                    <img
                      src={comment.userId.avatar}
                      className=" w-8 h-8 rounded-full"
                      alt=""
                    />
                  </span>
                  <div className=" bg-slate-100 text-sm p-2 px-3 rounded-r-2xl rounded-tl-3xl">
                    <span className="username">{comment.userId.username}</span>
                    <div className=" flex gap-10">
                      <p className="">{comment.content}</p>
                      <span className="">
                        {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className=" mt-2 ml-12 text-sm">
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <li key={reply._id} className="flex gap-2 items-center">
                        <span>
                          <img
                            src={reply.userId.avatar}
                            className=" w-6 h-6 rounded-full"
                            alt=""
                          />
                        </span>
                        <div className=" bg-slate-200 text-sm p-2 px-3 rounded-r-2xl rounded-tl-3xl">
                          <span className="username">{reply.userId.username}</span>
                          <div className=" flex gap-10">
                            <p className="">{reply.content}</p>
                            <span className="">
                              {moment(reply.createdAt).format("YYYY-MM-DD HH:mm")}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                <ReplyForm onSubmit={(reply) => handleNewReply(comment._id, reply)} />
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
    <form onSubmit={handleSubmit} className="text-sm ">
      <textarea
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Write your comment..."
        className=" p-3"
      />
      <button className="text-sm ml-3" type="submit">Post Comment</button>
    </form>
  );
};

const ReplyForm = ({ onSubmit }) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(replyText);
    setReplyText(""); // Clear reply input after submit
  };

  return (
    <form onSubmit={handleSubmit} className=" text-sm ml-12 mt-2">
      <textarea
        value={replyText}
        onChange={(event) => setReplyText(event.target.value)}
        placeholder="Write your reply..."
        className=" p-2"
      />
      <button className="text-sm ml-3" type="submit">Post Reply</button>
    </form>
  );
};

export default DiscussionForum;