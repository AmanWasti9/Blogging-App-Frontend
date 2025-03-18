import React, { useEffect, useState } from "react";
import { Box, Chip, Container, Typography } from "@mui/material";
import { loadPost } from "../../Services/PostService";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/Helper";
import { MdSportsCricket } from "react-icons/md";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Comment from "../../Components/Comment/Comment";
import LikComClapComp from "../../Components/LikComClapComp/LikComClapComp";
import { Helmet } from "react-helmet";
import "../../App.css";

export default function ViewBlog() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [readTime, setReadTime] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadPost(postId);
        setPost(data);
        calculateReadTime(data.content);
        setTimeout(() => {
          setShowCommentSection(true);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [postId]); // Empty dependency array to run the effect only once

  const printDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    setReadTime(time);
  };

  const imageUrl = post
    ? `${BASE_URL}/api/users/image/${post.user.imgName}`
    : `https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg`;

  return (
    <div style={{ backgroundColor: "white" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>View Blog | Dive into the Content</title>
        <link rel="canonical" href={`http://localhost:3000/post/${postId}`} />
      </Helmet>

      <Container
        maxWidth="lg"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        {post && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              padding: "0 0 40px 0",
              marginBottom: "30px",
            }}
          >
            {/* Featured Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                overflow: "hidden",
              }}
            >
              <img
                src={BASE_URL + "/api/post/image/" + post.imageName}
                alt=""
                style={{
                  width: "100%",
                  objectFit: "cover",
                  maxHeight: "500px",
                  transition: "transform 0.5s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  padding: "60px 40px 20px 40px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    backgroundColor: "rgba(232, 90, 79, 0.9)",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "fit-content",
                  }}
                >
                  <MdSportsCricket /> {post.category.categoryTitle}
                </div>
                <h1
                  style={{
                    color: "white",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "700",
                    marginBottom: "10px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {post.title}
                </h1>
              </div>
            </div>

            <Container style={{ padding: "30px 40px" }}>
              {/* Author Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "30px",
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(232, 90, 79, 0.03)",
                  border: "1px solid rgba(232, 90, 79, 0.1)",
                }}
              >
                <Link
                  to={"/user/user-profile/" + post.user.id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid white",
                      boxShadow: "0 4px 10px rgba(232, 90, 79, 0.15)",
                    }}
                  />
                </Link>

                <div>
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      marginBottom: "5px",
                      color: "#2a2a2a",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {post.user.name}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      fontSize: "0.85rem",
                      color: "#666",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FaClock style={{ color: "#e85a4f" }} /> {readTime} min
                      read
                    </span>
                    <span
                      style={{
                        fontSize: "0.5rem",
                        fontWeight: "bold",
                        color: "#e85a4f",
                      }}
                    >
                      •
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FaCalendarAlt style={{ color: "#e85a4f" }} />{" "}
                      {printDate(post.addedDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Like, Comment, Clap Component */}
              <div style={{ marginBottom: "30px" }}>
                <LikComClapComp />
              </div>

              {/* Blog Content */}
              <div
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#333",
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: "40px",
                }}
              >
                {post.content && parse(post.content)}
              </div>

              {/* Keywords */}
              <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "#2a2a2a",
                    fontFamily: "'Montserrat', sans-serif",
                    position: "relative",
                    paddingBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "40px",
                      height: "3px",
                      background: "linear-gradient(to right, #e85a4f, #e98074)",
                      borderRadius: "2px",
                    }}
                  ></span>
                  Keywords
                </h4>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {post &&
                  Array.isArray(post.keywords) &&
                  post.keywords.length > 0 ? (
                    post.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword.trim()}
                        sx={{
                          backgroundColor: "rgba(232, 90, 79, 0.06)",
                          color: "#e85a4f",
                          borderColor: "rgba(232, 90, 79, 0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(232, 90, 79, 0.1)",
                          },
                        }}
                        variant="outlined"
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No keywords generated yet.
                    </Typography>
                  )}
                </Box>
              </div>
            </Container>
          </div>
        )}

        {/* Comments Section */}
        {showCommentSection && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",
              padding: "30px",
              transition: "all 0.3s ease",
            }}
          >
            <Comment />
          </div>
        )}
      </Container>
    </div>
  );
}
