import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { getUserById, uploadUserImage } from "../../Services/UserService"; // Import uploadUserImage
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { toast } from "react-toastify";
import { TiTickOutline } from "react-icons/ti";
import { IoIosSettings, IoIosCamera } from "react-icons/io";
import ContentLoader from "react-content-loader";
import {
  createFollow,
  loadAllFollowersOfUser,
  deleteFollower,
  loadAllFollowingsOfUser,
} from "../../Services/FollowService";
import { Input } from "reactstrap";
import { BASE_URL } from "../../Services/Helper";
import { Mail, MapPin, BookText, Users, UserPlus } from "lucide-react";

export default function ProfileInfo({ postsLength, toggleProfileMenu }) {
  const { userId } = useParams();
  const [user, setUser] = useState(undefined);
  const [isFollow, setIsFollow] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState();
  const [totalFollowings, setTotalFollowings] = useState();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setTimeout(() => {
          setUser(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await loadAllFollowersOfUser(userId);
        setTotalFollowers(followersData.length);

        // Check if the current user is following the profile user
        const currentUser = getCurrentUserDetail();
        const isFollowing = followersData.some(
          (follower) => follower.follower.id === currentUser.id
        );
        setIsFollow(isFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFollowings = async () => {
      try {
        const followingsData = await loadAllFollowingsOfUser(userId);
        setTotalFollowings(followingsData.length);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchFollowers();
      fetchFollowings();
    }
  }, [userId]);

  // Handle Follow Button
  const handleFollowBtn = async () => {
    if (!isLoggedIn()) {
      toast.error("Need to Login First !!");
      return;
    }

    try {
      if (!isFollow) {
        const followData = {
          followerUserId: getCurrentUserDetail().id,
          followingUserId: userId,
          isFollow: !isFollow, // Toggle follow state
        };

        // For Follow API
        const follow = await createFollow(followData);
        console.log("follow", follow);
        setIsFollow(!isFollow); // Toggle follow state
        setTotalFollowers((prevTotalFollowers) => prevTotalFollowers + 1); // Increment total followers
      } else {
        const followers = await loadAllFollowersOfUser(userId);
        const userFollower = followers.find(
          (follow) => follow.follower.id === getCurrentUserDetail().id
        );

        const followId = userFollower?.id;

        // For Unfollow API
        await deleteFollower(followId);

        setIsFollow(!isFollow); // Toggle follow state
        setTotalFollowers((prevTotalFollowers) => prevTotalFollowers - 1); // Decrement total followers
      }
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  // Handling File Change Event
  const handleFileChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      setImage(image);
      try {
        const data = await uploadUserImage(image, userId);
        toast.success("Image uploaded successfully");
        // Update user data with new image URL if needed
        setUser((prevUser) => ({
          ...prevUser,
          imgName: data.imgName, // Assuming the response contains the new image name
        }));
      } catch (error) {
        toast.error(error.message || "Error uploading image");
      }
    }
  };

  if (!user) {
    return (
      <div>
        <center>
          <ContentLoader
            speed={2}
            width="100%"
            height={200}
            style={{
              margin: "0 10px",
            }}
          >
            <rect x="0" y="0" rx="5" ry="5" width="45%" height="40" />
            <rect x="63%" y="0" rx="5" ry="5" width="40%" height="180" />
            <rect x="0" y="50" rx="5" ry="5" width="50%" height="20" />
            <rect x="0" y="80" rx="5" ry="5" width="20%" height="10" />
            <rect x="0" y="100" rx="5" ry="5" width="20%" height="10" />
            <rect x="0" y="120" rx="5" ry="5" width="20%" height="10" />
            <rect x="0" y="150" rx="5" ry="5" width="60%" height="20" />
          </ContentLoader>
        </center>
      </div>
    );
  }

  const imageUrl = user.imgName
    ? `${BASE_URL}/api/users/image/${user.imgName}`
    : `https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg`;

  return (
    <>
      <div className="profile-page">
        <Container>
          <div
            className="profile-container"
            style={{
              marginTop: "2rem",
              padding: "2rem",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "var(--card-shadow)",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              fontFamily: "'Montserrat', sans-serif",
              gap: "2rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--background-dark)",
                  paddingBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(22px,2.2vw,38px)",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {user.name}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userId != getCurrentUserDetail().id ? (
                    <>
                      <button
                        style={{
                          background: isFollow
                            ? "var(--secondary-color)"
                            : "var(--primary-color)",
                          borderRadius: "30px",
                          border: "none",
                          color: "white",
                          padding: "8px 24px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "var(--transition-standard)",
                          boxShadow: isFollow
                            ? "0 4px 12px rgba(93, 87, 107, 0.2)"
                            : "0 4px 12px rgba(232, 90, 79, 0.2)",
                        }}
                        onClick={handleFollowBtn}
                      >
                        {isFollow ? (
                          <>
                            Following <TiTickOutline />
                          </>
                        ) : (
                          <>Follow</>
                        )}
                      </button>
                    </>
                  ) : (
                    <div
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        backgroundColor: "var(--background-dark)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--secondary-color)",
                        transition: "var(--transition-standard)",
                      }}
                      onClick={toggleProfileMenu}
                    >
                      <IoIosSettings />
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--background-light)",
                    borderRadius: "8px",
                    border: "1px solid var(--background-dark)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-color)",
                    }}
                  >
                    <BookText />
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {postsLength}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Publications
                  </div>
                </div>
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--background-light)",
                    borderRadius: "8px",
                    border: "1px solid var(--background-dark)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-color)",
                    }}
                  >
                    <Users />
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {totalFollowers}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Followers
                  </div>
                </div>
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--background-light)",
                    borderRadius: "8px",
                    border: "1px solid var(--background-dark)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-color)",
                    }}
                  >
                    <UserPlus />
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {totalFollowings}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Followings
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                {/* <h3 style={{ 
                  fontSize: "1.1rem", 
                  color: "var(--secondary-color)", 
                  marginBottom: "0.75rem",
                  fontWeight: "600"
                }}>About</h3> */}
                <div
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "var(--text-secondary)",
                  }}
                >
                  <div>{user.about || "No bio available"}</div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    display: "grid",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Mail style={{ height: "17px", width: "17px" }} />
                    <a
                      href={`mailto:${user.email}`}
                      target="_blank"
                      style={{
                        fontWeight: "500",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {user.email}
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>
                      <MapPin style={{ height: "17px", width: "17px" }} />
                    </span>
                    Karachi, PAK
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
                minWidth: "200px",
              }}
            >
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <img
                  src={imageUrl}
                  alt={user.name}
                  style={{
                    width: "clamp(140px, 12vw, 220px)",
                    height: "clamp(140px, 12vw, 220px)",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "4px solid var(--background-light)",
                  }}
                  className="avatar"
                />
                {userId == getCurrentUserDetail().id ? (
                  <>
                    <label htmlFor="image">
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 10px rgba(232, 90, 79, 0.3)",
                          transition: "var(--transition-standard)",
                        }}
                      >
                        <IoIosCamera style={{ fontSize: "22px" }} />
                      </div>
                    </label>
                    <Input
                      id="image"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
