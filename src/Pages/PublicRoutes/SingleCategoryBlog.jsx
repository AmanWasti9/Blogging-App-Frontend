import React, { useEffect, useState } from "react";
import {
  deleteSinglePost,
  loadAllActivePostsByCategories,
} from "../../Services/PostService";
import { toast } from "react-toastify";
import { Container, Grid } from "@mui/material";
import SquareShapeBlog from "../../Components/BlogComp/SquareShapeBlog";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { useParams } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { Helmet } from "react-helmet";

export default function SingleCategoryBlog() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllBlogs = async () => {
    try {
      const data = await loadAllActivePostsByCategories(categoryId);
      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error in loading Post from Server");
    }
  };

  useEffect(() => {
    loadAllBlogs();
  }, [categoryId]);

  const handleSearchResults = async (searchResults) => {
    try {
      if (searchResults === null) {
        // If search value is empty, load posts for the specific category
        await loadAllBlogs();
      } else {
        // Otherwise, handle search results
        const filteredPosts = searchResults.filter(
          (post) => post.category.categoryId === parseInt(categoryId)
        );
        setPosts(filteredPosts || []);
      }
    } catch (error) {
      console.error("Error in loading Post from Server");
    }
  };

  const printDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  function deletePost(post) {
    deleteSinglePost(post.postId)
      .then((res) => {
        toast.success("Post is deleted", res);
        setPosts(posts.filter((p) => p.postId !== post.postId));
      })
      .catch((error) => {
        console.error("Error in deleting Post", error);
      });
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Category Blogs | Explore More</title>
        <link
          rel="canonical"
          href={`http://localhost:3000/category/${categoryId}`}
        />
      </Helmet>

      <Container>
        <div>
          <Searchbar
            handleSearchResults={handleSearchResults}
            loadAllBlogs={loadAllBlogs}
            categoryId={categoryId}
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
            <Grid container spacing={2}>
              {posts.map((post, index) => (
                <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                  <SquareShapeBlog
                    post={post}
                    calculateReadTime={() => calculateReadTime(post.content)}
                    printDate={() => printDate(post.addedDate)}
                    deletePost={deletePost}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
}
