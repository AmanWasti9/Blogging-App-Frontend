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
    <Link to={"/blog/" + post.postId} className="td-n c-b">
      <div className="box-hover-main">
        <div className="flex-col box-tobe-hover">
          <div className="p-10px d-f jc-c h-200px">
            <img
              src={BASE_URL + "/api/post/image/" + post.imageName}
              alt=""
              className="w-100per h-100per obj-cov"
            />
          </div>
          <div className="p-10px">
            <div className="flex-row mb-8">
              {isLoggedIn() &&
              post.user.name === getCurrentUserDetail().name ? (
                <>
                  <div>{post.active ? "Published" : "Unpublished"}</div>
                </>
              ) : (
                <>
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
                  <div className="">
                    <span>{post.user.name}</span>
                  </div>
                </>
              )}
            </div>

            <div
              className="ellipise h5_Blog lh-20px f-b"
              style={{
                fontSize: "17px",
              }}
            >
              {post.title}
            </div>
            <div
              className="ellipise lh-20px"
              style={{
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              {parse(post.content)}
            </div>
            <br />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="d-f g-5px">
                <span className="fw-400 fs-13">
                  {printDate(post.addedDate)}
                </span>
                <span className="fw-400 fs-13 lh-15px">.</span>
                <span className="fw-400 fs-13">
                  {calculateReadTime(post.content)} min read
                </span>
              </div>
              {isLoggedIn() && getCurrentUserDetail().id === post.user.id && (
                <div className="d-f al-c g-15px fs-20">
                  <Link
                    to={"/user/update-blog/" + post.postId}
                    className="td-n c-b"
                  >
                    <RiEdit2Line />
                  </Link>
                  <MdDelete
                    onClick={handleDelete}
                    style={{
                      marginTop: "5px",
                    }}
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
