import React from "react";
import "../TrendingSection/TrendingSection.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { BASE_URL } from "../../Services/Helper";

export default function RectangleShapBlog({
  post = {
    id: -1,
    title: "This is Default post title",
    content: "Default Content",
  },
  calculateReadTime,
  printDate,
}) {
  return (
    <>
      {post && (
        <Link to={"/blog/" + post.postId} className="td-n c-b">
          <div
            className="Blog__Main p-10px flex-row w-100per al-c"
            style={{
              border: "1px solid #ccc",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: '20px'
            }}
          >
            <div className="Blog__div1 p-10px">
              <div className="flex-row mb-8 fs-13">
                <div>
                  <span>
                    <img
                      src={
                        post.user.imgName
                          ? `${BASE_URL}/api/users/image/${post.user.imgName}`
                          : "https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
                      }
                      alt=""
                      className="w-40px br-5px obj-con"
                    />
                  </span>
                </div>
                <div>
                  <span className="fs-13">{post.user.name}</span>
                </div>
              </div>
              <div className="ellipise c-242424 fw-700 lh-20px fs-1_4vw">
                {post.title}
              </div>
              <div className="ellipise lh-20px fs-1vw rec-cont mb-8">
                {parse(post.content, { replace: (domNode) => domNode })}
              </div>

              <div className="flex-row datenTime">
                <span className="readTime">{printDate}</span>
                <span className="readTime lh-15px">.</span>
                {/* <span className="readTime">{calculateReadTime} min read </span> */}
                <span className="readTime">
                  {calculateReadTime(post.content)} min read{" "}
                </span>
              </div>
            </div>
            <div className="Blog__div2">
              <img
                src={BASE_URL + "/api/post/image/" + post.imageName}
                alt=""
                className="img-blog"
              />
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
