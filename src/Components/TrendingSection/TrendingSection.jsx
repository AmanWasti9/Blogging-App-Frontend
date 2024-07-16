import React, { useEffect, useState } from "react";
import "./TrendingSection.css";
import { Container, Grid } from "@mui/material";
import { FaArrowTrendUp } from "react-icons/fa6";
import { getAllActivePostsWithLikes } from "../../Services/PostService";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { BASE_URL } from "../../Services/Helper";

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
        <div className="flex-row mb-8">
          <div>
            <span className="circular-icon">
              <FaArrowTrendUp />
            </span>
          </div>
          <div>
            <h4>Trending on Beacon</h4>
          </div>
        </div>
        <center>
          {allPosts === null ? (
            <>
              {[...Array(6)].map((_, index) => (
                <ContentLoader
                  speed={2}
                  width={300}
                  height={160}
                  style={{
                    margin: "0 10px",
                  }}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="50" height="50" />
                  <rect x="60" y="10" rx="4" ry="4" width="190" height="30" />
                  <rect x="0" y="60" rx="3" ry="3" width="250" height="20" />
                  <rect x="0" y="90" rx="3" ry="3" width="250" height="20" />
                  <rect x="0" y="120" rx="2" ry="2" width="100" height="10" />
                  <rect x="120" y="120" rx="2" ry="2" width="100" height="10" />
                </ContentLoader>
              ))}
            </>
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
                                      className="icon-img"
                                    />
                                  </span>
                                </div>
                                <div>
                                  <span>{post.user.name}</span>
                                </div>
                              </div>
                              <div className="mb-8">
                                <h5 className="ellipise fs-15 fw-700">
                                  {post.title}
                                </h5>
                              </div>
                              <div className="flex-row datenTime">
                                <span className="readTime">
                                  {printDate(post.addedDate)}
                                </span>
                                <span className="readTime lh-15px">.</span>
                                <span className="readTime">
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
