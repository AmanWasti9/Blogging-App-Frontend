import React, { useEffect, useState } from "react";
import { Input, Button, Form, Col, Row } from "reactstrap";
import { addComment, loadAllComments } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { Container } from "@mui/material";
import { IoSend } from "react-icons/io5";
import TextField from "@mui/material/TextField";

export default function CommentSection() {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState({
    content: "",
  });

  const [user, setUser] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await loadAllComments(postId);
      const reversedComments = data
        .map((comment) => ({
          ...comment,
          timeAgo: calculateTimeAgo(comment.addedDate),
        }))
        .reverse();
      setComments(reversedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const fieldChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const createComment = async (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Need to Login First !!");
      return;
    }

    if (newComment.content.trim() === "") {
      toast.error("Comment must not be null !!");
      return;
    }

    const commentData = {
      userId: user.id,
      postId: postId,
      content: newComment.content,
    };

    try {
      await addComment(commentData);
      await fetchComments(); // Fetch comments after adding a new comment
      setNewComment({ ...newComment, content: "" }); // Reset input field
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment");
    }
  };

  // Function to calculate time difference
  const calculateTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diff = now - commentDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  return (
    <div>
      {/* The comments will display of the particular post */}
      <Container>
        <Row className="mt-2">
          <Col>
            <h3>Comments</h3>

            {!comments.length && <p>No comments available</p>}

            {/* Add The Comment */}
            <Form onSubmit={createComment}>
              {isLoggedIn() ? (
                <>
                  <div
                    style={{
                      border: "2px solid black",
                      width: "100%",
                      borderRadius: "12px",
                      marginLeft: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        type="input"
                        placeholder="Enter comment here ..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "none",
                          outline: "none",
                        }}
                        name="content"
                        value={newComment.content}
                        onChange={fieldChange}
                      />{" "}
                    </div>

                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        background: "transparent",
                        border: "none",
                        color: "black",
                      }}
                      type="submit"
                    >
                      <IoSend />
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Form>
            <br />
            <Container>
              {comments.length > 0 && (
                <>
                  {showAllComments
                    ? comments.map((commentItem) => (
                        <div className="flex-row" key={commentItem.id}>
                          <div className="cpic">
                            <p className="fs-12">Image</p>
                          </div>
                          <div className="c_namcom flex-col">
                            <div className="cname">
                              <p className="c-grey fs-12">
                                {commentItem.user.name} . {commentItem.timeAgo}
                              </p>
                            </div>
                            <div className="ccom">
                              <p>{commentItem.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    : comments.slice(0, 5).map((commentItem) => (
                        <div className="flex-row" key={commentItem.id}>
                          <div className="cpic">
                            <p className="fs-12">Image</p>
                          </div>
                          <div className="c_namcom flex-col">
                            <div className="cname">
                              <p className="c-grey fs-12">
                                {commentItem.user.name} . {commentItem.timeAgo}
                              </p>
                            </div>
                            <div className="ccom">
                              <p>{commentItem.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  {!showAllComments && comments.length > 5 && (
                    <p
                      onClick={handleShowAllComments}
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      See More
                    </p>
                  )}
                </>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
