import React, { useEffect, useState } from "react";
import { loadAllActivePosts } from "../../Services/PostService";
import { Container, Grid } from "@mui/material";
import SquareShapeBlog from "../../Components/BlogComp/SquareShapeBlog";
import Searchbar from "../../Components/Searchbar/Searchbar";
import ContentLoader from "react-content-loader";
import { Helmet } from "react-helmet";

export default function AllBlogsPage() {
  const [posts, setPosts] = useState(null);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = (postId) => {
    // Update the state to mark the post as deleted
    setDeletedPosts([...deletedPosts, postId]);
  };

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const loadAllBlogs = async () => {
    try {
      const data = await loadAllActivePosts();
      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error in loading Post from Server");
    }
  };

  const handleSearchResults = (searchResults) => {
    setPosts(searchResults || []);
  };

  return (
    <div>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Blogs | Where Ideas Flourish</title>
          <link rel="canonical" href="http://localhost:3000/all-blogs" />
        </Helmet>

        <div>
          <Searchbar
            handleSearchResults={handleSearchResults}
            loadAllBlogs={loadAllBlogs}
          />
        </div>
        <br />
        {loading ? (
          // Display skeleton loading while data is being fetched
          <>
            <center>
              {[...Array(6)].map((_, index) => (
                <ContentLoader
                  speed={2}
                  width={300}
                  height={400}
                  style={{
                    margin: "0 10px",
                  }}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="340" height="200" />
                  <rect x="0" y="210" rx="5" ry="5" width="50" height="50" />
                  <rect x="60" y="220" rx="4" ry="4" width="200" height="30" />
                  <rect x="0" y="270" rx="5" ry="5" width="340" height="25" />
                  <rect x="0" y="310" rx="5" ry="5" width="340" height="15" />
                  <rect x="0" y="340" rx="2" ry="2" width="100" height="10" />
                  <rect x="120" y="340" rx="2" ry="2" width="100" height="10" />
                </ContentLoader>
              ))}
            </center>
          </>
        ) : posts.length === 0 ? (
          <p className="d-f jc-c fs-40">Nothing Found</p>
        ) : (
          <>
            <center>
              <Container>
                <Grid container spacing={2}>
                  {posts.map(
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
                            onDeletePost={handleDeletePost} // Pass the onDeletePost function as a prop
                          />
                        </Grid>
                      )
                  )}
                </Grid>
              </Container>
            </center>
          </>
        )}
      </Container>
    </div>
  );
}
