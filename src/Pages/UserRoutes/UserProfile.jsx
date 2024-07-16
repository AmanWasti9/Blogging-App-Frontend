import React, { useEffect, useState } from "react";
import ProfileInfo from "../../Components/Profile/ProfileInfo";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import SquareShapeBlog from "../../Components/BlogComp/SquareShapeBlog";
import { loadPostsUserWise } from "../../Services/PostService";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import UpdateProfile from "../../Components/Profile/UpdateProfile";
import ProfileMenu from "../../Components/Profile/ProfileMenu";
import UpdatePassword from "../../Components/Profile/UpdatePassword";
import UpdateEmail from "../../Components/Profile/UpdateEmail";
import { Helmet } from "react-helmet";
import ContentLoader from "react-content-loader";

export default function UserProfile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = (postId) => {
    // Update the state to mark the post as deleted
    setDeletedPosts([...deletedPosts, postId]);
  };

  const loadPostsByUserId = async () => {
    try {
      const data = await loadPostsUserWise(userId);
      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error in loading Post from Server:", error);
      toast.error("Error in loading Post from Server");
    }
  };

  useEffect(() => {
    loadPostsByUserId();
  }, [userId]);

  // Function to handle opening/closing the UpdateProfile component
  const toggleProfileMenuItems = () => {
    setIsProfileMenu(!isProfileMenu);
  };

  // Function to handle opening/closing the UpdateProfile component
  const toggleEditingProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  // Function to handle opening/closing the UpdateProfile component
  const toggleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
  };

  // Function to handle opening/closing the UpdateProfile component
  const toggleChangeEmail = () => {
    setIsChangeEmail(!isChangeEmail);
  };

  return (
    <>
      <div>
        <Container>
          <Helmet>
            <meta charSet="utf-8" />
            <title>View Profile | Discover Your Content</title>
            <link
              rel="canonical"
              href="http://localhost:3000/user/user-profile/:userId"
            />
          </Helmet>

          <ProfileInfo
            postsLength={posts.length}
            toggleProfileMenu={toggleProfileMenuItems}
          />
          <br />
          <Container>
            <hr />
          </Container>
          <div>
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
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        ry="5"
                        width="340"
                        height="200"
                      />
                      <rect
                        x="0"
                        y="210"
                        rx="5"
                        ry="5"
                        width="50"
                        height="50"
                      />
                      <rect
                        x="60"
                        y="220"
                        rx="4"
                        ry="4"
                        width="200"
                        height="30"
                      />
                      <rect
                        x="0"
                        y="270"
                        rx="5"
                        ry="5"
                        width="340"
                        height="25"
                      />
                      <rect
                        x="0"
                        y="310"
                        rx="5"
                        ry="5"
                        width="340"
                        height="15"
                      />
                      <rect
                        x="0"
                        y="340"
                        rx="2"
                        ry="2"
                        width="100"
                        height="10"
                      />
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
            ) : posts.length === 0 ? (
              // Display message if there are no posts
              <center>
                <h2>No Post yet. Let the creativity begin!</h2>
              </center>
            ) : (
              <>
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
                              onDeletePost={handleDeletePost}
                            />
                          </Grid>
                        )
                    )}
                  </Grid>
                </Container>
              </>
            )}
          </div>
        </Container>
      </div>
      {isEditingProfile && (
        <UpdateProfile
          toggleEditProfile={toggleEditingProfile}
          toggleProfileMenu={toggleProfileMenuItems}
        />
      )}

      {isChangePassword && (
        <UpdatePassword
          toggleProfileMenu={toggleProfileMenuItems}
          toggleChangePassword={toggleChangePassword}
        />
      )}

      {isChangeEmail && (
        <UpdateEmail
          toggleProfileMenu={toggleProfileMenuItems}
          toggleChangeEmail={toggleChangeEmail}
        />
      )}

      {isProfileMenu && (
        <ProfileMenu
          toggleProfileMenu={toggleProfileMenuItems}
          toggleEditProfile={toggleEditingProfile}
          toggleChangePassword={toggleChangePassword}
          loadPostsByUserId={loadPostsByUserId}
          toggleChangeEmail={toggleChangeEmail}
        />
      )}
    </>
  );
}
