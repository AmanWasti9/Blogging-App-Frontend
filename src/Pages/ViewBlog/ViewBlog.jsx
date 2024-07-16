import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { loadPost } from "../../Services/PostService";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/Helper";
import { MdSportsCricket } from "react-icons/md";
import Comment from "../../Components/Comment/Comment";
import LikComClapComp from "../../Components/LikComClapComp/LikComClapComp";
import { Helmet } from "react-helmet";

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
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>View Blog | Dive into the Content</title>
        <link rel="canonical" href={`http://localhost:3000/post/${postId}`} />
      </Helmet>

      <Container>
        <Container>
          {post && (
            <>
              <p>
                <MdSportsCricket /> {post.category.categoryTitle}
              </p>
              <h1 className="fs-1_8vw">{post.title}</h1>
              <div className="Author_Name flex-row">
                <Link to={"/user/user-profile/" + post.user.id}>
                  <div>
                    <span>
                      {post ? (
                        <>
                          <img
                            // src={BASE_URL + "/api/users/image/" + user.imgName}
                            src={imageUrl}
                            alt=""
                            className="h-3vw w-3vw obj-cov br-50per"
                            // className="avatar"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </Link>

                <div className="flex-col">
                  <h4 className="fs-1_3vw">{post.user.name}</h4>
                  <span className="fs-0_9vw">
                    {readTime} min read . {printDate(post.addedDate)}
                  </span>
                </div>
              </div>
              <LikComClapComp />
              <div
                className="img"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={BASE_URL + "/api/post/image/" + post.imageName}
                  alt=""
                  className="obj-con w-50per"
                />
              </div>
              <Container>
                <div
                  className="fs-con fw-500"
                  style={{
                    textAlign: "justify",
                  }}
                >
                  {post.content && parse(post.content)}
                </div>
              </Container>
            </>
          )}
          <br />

          {showCommentSection && <Comment />}
        </Container>
      </Container>
    </div>
  );
}
