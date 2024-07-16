import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { toast } from "react-toastify";
import { getUserById, updateUserById } from "../../Services/UserService";
import { IoMdArrowBack } from "react-icons/io";
import { Helmet } from "react-helmet";

export default function UpdateProfile({
  toggleEditProfile,
  toggleProfileMenu,
}) {
  // const [user, setUser] = useState();
  const [user, setUser] = useState({
    name: "",
    about: "",
  });

  // Load Data od Current User
  const fetchUser = async () => {
    try {
      const data = await getUserById(getCurrentUserDetail().id);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (event, fieldName) => {
    setUser({
      ...user,
      [fieldName]: event.target.value,
    });
  };

  const handleUpdateBtn = async (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Need to Login First !!");
      return;
    }

    try {
      await updateUserById(user, user.id);
      toast.success("User profile updated successfully");
      handleClosebtn();
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating user profile");
    }
  };

  const handleClosebtn = () => {
    toggleEditProfile();
  };

  const handleBackbtn = () => {
    toggleEditProfile();
    toggleProfileMenu();
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile | Personalize Your Profile</title>
        <link
          rel="canonical"
          href="http://localhost:3000/user/update-blog/:blogId"
        />
      </Helmet>
      <div className="profile-preview">
        <div className="preview">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="backclose-btn">
              <IoMdArrowBack onClick={handleBackbtn} />
            </div>
            <div className="backclose-btn">
              <IoIosCloseCircleOutline onClick={handleClosebtn} />
            </div>
          </div>

          <div className="update-profile-textfield">
            {/* Name */}
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              className="w-100per"
              value={user.name}
              onChange={(event) => handleChange(event, "name")}
            />

            <br />
            <br />
            {/* About */}
            <TextField
              id="standard-basic"
              label="About"
              variant="standard"
              className="w-100per"
              value={user.about}
              onChange={(event) => handleChange(event, "about")}
            />
            <br />
            <br />

            <button
              className="br-6px bc-trans fs-1_2vw fw-600 b-r pt-5px pb-5px pl-20px pr-20px"
              onClick={handleUpdateBtn}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
