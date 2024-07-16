import React, { useEffect, useState } from "react";
import AllCategory from "../AllCategory/AllCategory";
import RectangleShapBlog from "../BlogComp/RectangleShapBlog";
import { loadAllActivePostsWithPagination } from "../../Services/PostService";
import ContentLoader from "react-content-loader";
import { Container } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

export default function AllBlogs() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
    pageNumber: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  // change page
  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }

    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    loadAllActivePostsWithPagination(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
        // window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Error in loading Post from Server");
      });
  };

  const changePageInfinite = () => {
    console.log("paged changed");
    setCurrentPage(currentPage + 1);
  };

  const printDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <Container>
      <div className="d-f w-100per">
        <div className="AllBlog__div1">
          <div className="blog-content">
            {postContent.content.length === 0 ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <ContentLoader
                    key={index}
                    speed={2}
                    width="100%"
                    height={160}
                    style={{ margin: "0 15px" }}
                  >
                    <rect x="0%" y="5%" rx="5" ry="5" width="clamp(8%,5%,5%)" height="25%" />
                    <rect x="70%" y="7%" rx="2" ry="2" width="25%" height="65%" />
                    <rect x="10%" y="12%" rx="2" ry="2" width="30%" height="12%" />
                    <rect x="0%" y="33%" rx="2" ry="2" width="55%" height="12%" />
                    <rect x="0%" y="50%" rx="2" ry="2" width="65%" height="7%" />
                    <rect x="0%" y="65%" rx="2" ry="2" width="10%" height="5%" />
                    <rect x="14%" y="65%" rx="2" ry="2" width="10%" height="5%" />
                  </ContentLoader>
                ))}
              </>
            ) : (
              <InfiniteScroll
                dataLength={postContent.content.length}
                next={changePageInfinite}
                hasMore={!postContent.lastPage}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: "center" }}>End of content</p>}
              >
                {postContent.content.map((post) => (
                  <React.Fragment key={post.id}>
                    <RectangleShapBlog
                      post={post}
                      calculateReadTime={calculateReadTime}
                      printDate={printDate(post.addedDate)}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
        <div className="AllBlog__div2">
          <div className="sticky-wrapper">
            <AllCategory />
          </div>
        </div>
      </div>
    </Container>
  );
}
