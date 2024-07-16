import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { loadLikeByUser } from "../../Services/LikeService";
import { loadPost } from "../../Services/PostService";
import SquareShapeBlog from "../../Components/BlogComp/SquareShapeBlog";
import { getCurrentUserDetail } from "../../Auth/Auth";
import ContentLoader from "react-content-loader";
import { Helmet } from "react-helmet";

export default function UserLikedBlogs() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = (postId) => {
    // Update the state to mark the post as deleted
    setDeletedPosts([...deletedPosts, postId]);
  };

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const currentUser = getCurrentUserDetail();
        if (currentUser) {
          const likes = await loadLikeByUser(currentUser.id);
          const likedPostIds = likes.map((like) => like.post.postId);
          const posts = await Promise.all(
            likedPostIds.map((postId) => loadPost(postId))
          );
          setTimeout(() => {
            setLikedPosts(posts);
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false); // Ensure loading is set to false if no user is found
        }
      } catch (error) {
        console.error("Error loading liked posts:", error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div>
      <Container>
        <center>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Liked Blogs | Review Your Favorite Articles</title>
            <link
              rel="canonical"
              href="http://localhost:3000/user/liked-blogs"
            />
          </Helmet>
          {loading ? (
            // Display skeleton loading while data is being fetched
            <>
              <center>
                {[...Array(6)].map((_, index) => (
                  <ContentLoader
                    key={index} // Added key here to suppress React warning
                    speed={2}
                    width={300}
                    height={400}
                    style={{
                      margin: "0 10px",
                    }}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="340" height="200" />
                    <rect x="0" y="210" rx="5" ry="5" width="50" height="50" />
                    <rect
                      x="60"
                      y="220"
                      rx="4"
                      ry="4"
                      width="200"
                      height="30"
                    />
                    <rect x="0" y="270" rx="5" ry="5" width="340" height="25" />
                    <rect x="0" y="310" rx="5" ry="5" width="340" height="15" />
                    <rect x="0" y="340" rx="2" ry="2" width="100" height="10" />
                    <rect
                      x="120"
                      y="340"
                      rx="2"
                      ry="2"
                      width="100"
                      height="10"
                    />
                  </ContentLoader>
                ))}
              </center>
            </>
          ) : (
            <>
              <center>
                <Container>
                  {likedPosts.length > 0 ? (
                    <Grid container spacing={2}>
                      {likedPosts.map(
                        (post) =>
                          !deletedPosts.includes(post.postId) && (
                            <Grid
                              item
                              lg={4}
                              md={4}
                              sm={6}
                              xs={12}
                              key={post.postId}
                            >
                              <SquareShapeBlog
                                post={post}
                                onDeletePost={handleDeletePost}
                              />
                            </Grid>
                          )
                      )}
                    </Grid>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50vh", 
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.5rem",
                        }}
                      >
                        You haven't liked any posts yet. Start exploring and
                        liking your favorite blogs!
                      </p>
                    </div>
                  )}
                </Container>
              </center>
            </>
          )}
        </center>
      </Container>
    </div>
  );
}
