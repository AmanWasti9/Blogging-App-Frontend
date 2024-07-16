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

  const imageUrl = user.imgName ? `${BASE_URL}/api/users/image/${user.imgName}` : `https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg`;


  return (
    <>
      <div>
        <Container>
          <br />
          <div
            className="profile-container"
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(20px,2vw,35px)",
                    marginRight: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {user.name}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userId != getCurrentUserDetail().id ? (
                    <>
                      <button
                        style={{
                          backgroundColor: "red",
                          borderRadius: "6px",
                          border: "none",
                          color: "white",
                          padding: "5px 20px",
                        }}
                        onClick={handleFollowBtn}
                      >
                        {isFollow ? (
                          <>
                            Followed <TiTickOutline />
                          </>
                        ) : (
                          <>Follow</>
                        )}
                      </button>
                    </>
                  ) : (
                    <div
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <IoIosSettings onClick={toggleProfileMenu} />
                    </div>
                  )}
                </div>
              </div>
              <br />
              {/* */}
              <div className="d-f fs-1_1vw g-3w amm">
                <div>
                  <b>{postsLength}</b> Writings
                </div>
                <div>
                  <b>{totalFollowers}</b> followers
                </div>
                <div>
                  <b>{totalFollowings}</b> following
                </div>
              </div>{" "}
              <br />
              <div
                style={{
                  fontSize: "clamp(13px,1vw,25px)",
                }}
              >
                <div>18 years old</div>
                <div>{user.email}</div>
                <div>Karachi, PAK</div>
              </div>
              <br />
              <div
                style={{
                  fontSize: "clamp(15px,1.1vw,30px)",
                }}
              >
                <div>{user.about}</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <img
                // src={BASE_URL + "/api/users/image/" + user.imgName}
                src={imageUrl}
                alt=""
                style={{
                  width: "clamp(140px , 15vw ,300px)",
                  height: "clamp(140px , 15vw ,300px)",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
                className="avatar"
              />
              {userId == getCurrentUserDetail().id ? (
                <>
                  <label htmlFor="image">
                    <IoIosCamera
                      style={{
                        position: "absolute",
                        fontSize: "50px",
                        color: "black",
                        bottom: "0",
                        right: "0",
                        border: "2px solid black",
                        borderRadius: "20px",
                        cursor: "pointer",
                      }}
                    />
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
        </Container>
      </div>
    </>
  );
}
