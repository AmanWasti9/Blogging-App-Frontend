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
            className="Blog__Main p-10px flex-row al-c"
            style={{
              border: "1px solid rgba(232, 90, 79, 0.1)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",
              padding: '20px',
              borderRadius: '16px',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'translateY(0)',
              background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              margin: '10px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(232, 90, 79, 0.08), 0 5px 15px rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.borderColor = "rgba(232, 90, 79, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)";
              e.currentTarget.style.borderColor = "rgba(232, 90, 79, 0.1)";
            }}
          >
            <div className="Blog__div1 p-10px">
              <div className="flex-row mb-8 fs-13" style={{ gap: "12px", alignItems: "center" }}>
                <div>
                  <span>
                    <img
                      src={
                        post.user.imgName
                          ? `${BASE_URL}/api/users/image/${post.user.imgName}`
                          : "https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
                      }
                      alt=""
                      className="w-40px obj-con"
                      style={{ 
                        width: "42px", 
                        height: "42px", 
                        borderRadius: "50%", 
                        objectFit: "cover",
                        border: "2px solid #fff",
                        boxShadow: "0 3px 10px rgba(232, 90, 79, 0.15)" 
                      }}
                    />
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontSize: "0.95rem", 
                    fontWeight: "600",
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#2a2a2a",
                    letterSpacing: "0.01em"
                  }}>{post.user.name}</span>
                </div>
              </div>
              <div style={{ 
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#1a1a1a",
                fontWeight: "700",
                lineHeight: "1.3",
                fontSize: "clamp(1.25rem, 1.5vw, 1.7rem)",
                fontFamily: "'Playfair Display', serif",
                marginBottom: "14px",
                marginTop: "10px",
                position: "relative",
                paddingBottom: "8px"
              }}>
                <span style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(to right, #e85a4f, #e98074)",
                  borderRadius: "2px"
                }}></span>
                {post.title}
              </div>
              <div style={{ 
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.7",
                fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)",
                marginBottom: "18px",
                color: "#444",
                fontFamily: "'Poppins', sans-serif",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical"
              }}>
                {parse(post.content, { replace: (domNode) => domNode })}
              </div>

              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px",
                fontSize: "0.85rem",
                color: "#555",
                fontFamily: "'Montserrat', sans-serif"
              }}>
                <span style={{ 
                  padding: "5px 12px", 
                  background: "rgba(232, 90, 79, 0.06)", 
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  color: "#e85a4f",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {printDate}
                </span>
                <span style={{ fontSize: "0.5rem", fontWeight: "bold", color: "#e85a4f" }}>•</span>
                <span style={{ 
                  padding: "5px 12px", 
                  background: "rgba(232, 90, 79, 0.06)", 
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  color: "#e85a4f",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {calculateReadTime(post.content)} min read
                </span>
              </div>
            </div>
            <div className="Blog__div2" style={{ marginLeft: "20px" }}>
              <img
                src={BASE_URL + "/api/post/image/" + post.imageName}
                alt=""
                style={{ 
                  width: "180px", 
                  height: "140px", 
                  objectFit: "cover", 
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(232, 90, 79, 0.1)",
                  border: "3px solid white",
                  transition: "all 0.4s ease"
                }}
              />
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
