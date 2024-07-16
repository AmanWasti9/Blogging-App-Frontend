import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { loadSaveByUser } from "../../Services/SaveService";
import { loadPost } from "../../Services/PostService";
import SquareShapeBlog from "../../Components/BlogComp/SquareShapeBlog";
import { getCurrentUserDetail } from "../../Auth/Auth";
import ContentLoader from "react-content-loader";
import { Helmet } from "react-helmet";

export default function UserSavedBlogs() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = (postId) => {
    // Update the state to mark the post as deleted
    setDeletedPosts([...deletedPosts, postId]);
  };

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const currentUser = getCurrentUserDetail();
        if (currentUser) {
          const saves = await loadSaveByUser(currentUser.id);
          const savedPostIds = saves.map((save) => save.post.postId);
          const posts = await Promise.all(
            savedPostIds.map((postId) => loadPost(postId))
          );
          setTimeout(() => {
            setSavedPosts(posts);
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false); // Ensure loading is set to false if no user is found
        }
      } catch (error) {
        console.error("Error loading saved posts:", error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div>
      <Container>
        <center>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Saved Blogs | Access Your Favorites</title>
            <link
              rel="canonical"
              href="http://localhost:3000/user/saved-blogs"
            />
          </Helmet>
          {loading ? (
            // Display skeleton loading while data is being fetched
            <>
              <center>
                {[...Array(6)].map((_, index) => (
                  <ContentLoader
                    key={index}
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
                  {savedPosts.length > 0 ? (
                    <Grid container spacing={2}>
                      {savedPosts.map(
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
                                key={post.postId}
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
                        No saved blogs found. Discover posts and save the ones
                        you love!
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
