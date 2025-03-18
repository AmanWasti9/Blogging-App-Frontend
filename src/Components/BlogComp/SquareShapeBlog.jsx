import React, { useState } from "react";
import "../TrendingSection/TrendingSection.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { BASE_URL } from "../../Services/Helper";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { deleteSinglePost } from "../../Services/PostService";
import { toast } from "react-toastify";
import { showConfirmationDialog } from "../SweetAlert/SweetAlert";
import { FiClock } from "react-icons/fi";

export default function SquareShapeBlog({
  post = {
    id: -1,
    title: "This is Default post title",
    content: "Default Content",
  },
  onDeletePost,
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!",
      "Cancel"
    );
    if (confirmed) {
      try {
        await deleteSinglePost(post.postId);
        onDeletePost(post.postId);
        setIsDeleted(true);
        toast.success("Post is deleted");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error in deleting Post");
      }
    }
  };

  if (isDeleted) {
    return null; // Don't render anything if the post is deleted
  }


  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  const printDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const imageUrl = post
    ? `${BASE_URL}/api/users/image/${post.user.imgName}`
    : `https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg`;

  return (
    <Link to={"/blog/" + post.postId} className="td-n">
      <div
        className="box-hover-main"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          backgroundColor: "var(--background-light)",
          boxShadow: "var(--card-shadow)",
          transition: "var(--transition-standard)",
          margin: "8px 4px",
          // fontFamily: "'Playfair Display', serif",
        }}
      >
        <div
          className="flex-col box-tobe-hover"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <div
            className="p-10px d-f jc-c h-200px"
            style={{
              overflow: "hidden",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <img
              // src={BASE_URL + "/api/post/image/" + post.imageName}
              src={
                post.imageName
                  ? `${BASE_URL}/api/post/image/${post.imageName}`
                  : "/placeholder.svg"
              }
              alt=""
              className="w-100per h-100per obj-cov"
              style={{
                transition: "transform 0.5s ease",
                borderRadius: "8px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            {isLoggedIn() && post.user.name === getCurrentUserDetail().name && (
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: post.active
                    ? "var(--primary-color)"
                    : "var(--secondary-color)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {post.active ? "Published" : "Unpublished"}
              </div>
            )}
          </div>
          <div
            className="p-10px"
            style={{
              padding: "16px",
            }}
          >
            {!(
              isLoggedIn() && post.user.name === getCurrentUserDetail().name
            ) && (
              <div
                className="flex-row mb-8"
                style={{
                  marginBottom: "12px",
                }}
              >
                <div>
                  <span>
                    <img
                      src={
                        post.user.imgName
                          ? `${BASE_URL}/api/users/image/${post.user.imgName}`
                          : "https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
                      }
                      alt=""
                      className="br-50per obj-cov"
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "2px solid var(--primary-light)",
                        transition: "var(--transition-standard)",
                      }}
                    />
                  </span>
                </div>
                <div style={{ color: "var(--text-primary)" }}>
                  <span
                    style={{
                      fontWeight: "600",
                      // fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {post.user.name}
                  </span>
                </div>
              </div>
            )}

            <div
              className="ellipise h5_Blog lh-20px f-b"
              style={{
                fontSize: "18px",
                color: "var(--text-primary)",
                marginBottom: "10px",
                fontWeight: "700",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {post.title}
            </div>
            <div
              className="ellipise lh-20px"
              style={{
                fontSize: "16px",
                marginTop: "10px",
                color: "var(--text-secondary)",
              }}
            >
              {parse(post.content)}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "16px",
                borderTop: "1px solid rgba(0,0,0,0.05)",
                paddingTop: "12px",
              }}
            >
              <div className="d-f g-5px" style={{ alignItems: "center" }}>
                <span
                  className="fw-400 fs-13"
                  style={{ color: "var(--accent-color)" }}
                >
                  {printDate(post.addedDate)}
                </span>
                <span
                  className="fw-400 fs-13 lh-15px"
                  style={{ color: "var(--accent-color)" }}
                >
                  •
                </span>
                <span
                  className="fw-400 fs-13 d-f al-c g-5px"
                  style={{ color: "var(--accent-color)" }}
                >
                  <FiClock style={{ fontSize: "14px" }} />
                  {calculateReadTime(post.content)} min read
                </span>
              </div>
              {isLoggedIn() && getCurrentUserDetail().id === post.user.id && (
                <div className="d-f al-c g-15px fs-20">
                  <Link
                    to={"/user/update-blog/" + post.postId}
                    className="td-n"
                    style={{
                      color: "var(--secondary-color)",
                      transition: "var(--transition-standard)",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--primary-color)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--secondary-color)")
                    }
                  >
                    <RiEdit2Line />
                  </Link>
                  <MdDelete
                    onClick={handleDelete}
                    style={{
                      color: "var(--secondary-color)",
                      cursor: "pointer",
                      transition: "var(--transition-standard)",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--primary-color)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "var(--secondary-color)")
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
