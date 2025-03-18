import React, { useEffect, useState } from "react";
import "./TrendingSection.css";
import { Container, Grid } from "@mui/material";
import { FaArrowTrendUp } from "react-icons/fa6";
import { getAllActivePostsWithLikes } from "../../Services/PostService";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { BASE_URL } from "../../Services/Helper";
import { motion } from "motion/react";

export default function TrendingSection() {
  const [allPosts, setAllPosts] = useState(null); // Initialize as null

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getAllActivePostsWithLikes();
        // Sort posts based on likes
        const postsWithLikesCount = data.map((post) => ({
          ...post,
          totalLikes: post.likes.length,
        }));
        // Sort posts based on total number of likes
        const sortedPosts = postsWithLikesCount.sort(
          (a, b) => b.totalLikes - a.totalLikes
        );

        // Get top 3 posts
        const topPosts = sortedPosts.slice(0, 6);

        setAllPosts(topPosts);
      } catch (error) {
        console.error("Error in fetching all Trending posts", error);
      }
    };

    loadPosts();
  }, []); // Make sure to add any necessary dependencies to the dependency array

  const printDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (content) => {
    // Assuming average reading speed of 200 words per minute
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  return (
    <div>
      <br />
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-row mb-8" 
          style={{ 
            alignItems: "center", 
            gap: "20px", 
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            paddingBottom: "24px",
            position: "relative"
          }}>
          <div>
            <motion.span 
              whileHover={{ rotate: 0, scale: 1.1 }}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                width: "54px", 
                height: "54px", 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)", 
                color: "white",
                boxShadow: "0 8px 25px rgba(232, 90, 79, 0.3)",
                transform: "rotate(-10deg)",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}>
              <FaArrowTrendUp style={{ fontSize: "1.5rem" }} />
            </motion.span>
          </div>
          <div>
            <h4 className="heading-md" style={{ 
              margin: 0, 
              fontWeight: "700", 
              background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "0.02em",
              position: "relative",
              fontFamily: "'Playfair Display', serif"
            }}>Trending on Beacon</h4>
            <div style={{
              height: "3px",
              width: "40%",
              background: "linear-gradient(90deg, rgba(232, 90, 79, 0.7) 0%, rgba(232, 90, 79, 0) 100%)",
              marginTop: "10px",
              borderRadius: "3px"
            }}></div>
          </div>
        </motion.div>
        <center>
          {allPosts === null ? (
            <div className="TrendSec__div1">
              <div className="TrendSec__div2">
                {[...Array(6)].map((_, index) => (
                  <div className="TrendSec__subdiv" key={index}>
                    <ContentLoader
                      speed={2}
                      width={300}
                      height={160}
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                      style={{
                        margin: "0",
                        padding: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        width: "100%"
                      }}
                    >
                      <circle cx="20" cy="20" r="20" /> 
                      <rect x="50" y="15" rx="4" ry="4" width="100" height="12" />
                      <rect x="15" y="50" rx="3" ry="3" width="250" height="15" />
                      <rect x="15" y="75" rx="3" ry="3" width="230" height="15" />
                      <rect x="15" y="120" rx="2" ry="2" width="80" height="10" />
                      <rect x="105" y="120" rx="2" ry="2" width="80" height="10" />
                      <rect x="0" y="0" rx="8" ry="8" width="40" height="160" opacity="0.1" />
                    </ContentLoader>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="TrendSec__div1">
                <div className="TrendSec__div2">
                  {allPosts &&
                    allPosts.map((post, index) => (
                      <div className="TrendSec__subdiv" key={index}>
                        <Link to={"/blog/" + post.postId} className="td-n c-b">
                          <div className="TrendSec__subdiv1">
                            <div className="TrendSec__subdiv1__h1">
                              <h1>0{index + 1}</h1>
                            </div>
                            <div className="TrendSec__subdiv1__2">
                              <div className="flex-row mb-8">
                                <div>
                                  <span>
                                    <img
                                      src={
                                        post.user.imgName
                                          ? `${BASE_URL}/api/users/image/${post.user.imgName}`
                                          : "https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
                                      }
                                      alt=""
                                      className="icon-img br-50per"
                                      style={{ border: "2px solid rgba(0,0,0,0.05)" }}
                                    />
                                  </span>
                                </div>
                                <div>
                                  <span style={{ fontWeight: "600", fontSize: "14px" }}>{post.user.name}</span>
                                </div>
                              </div>
                              <div className="mb-8">
                                <h5 className="ellipise fs-15 fw-700" style={{ 
                                  marginBottom: "8px", 
                                  lineHeight: "1.4",
                                  letterSpacing: "0.01em",
                                  color: "#222"
                                }}>
                                  {post.title}
                                </h5>
                              </div>
                              <div className="flex-row datenTime" style={{ opacity: "0.7" }}>
                                <span className="readTime" style={{ fontSize: "13px" }}>
                                  {printDate(post.addedDate)}
                                </span>
                                <span className="readTime lh-15px" style={{ margin: "0 6px" }}>•</span>
                                <span className="readTime" style={{ fontSize: "13px" }}>
                                  {calculateReadTime(post.content)} min read
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </center>
      </Container>
    </div>
  );
}
