import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./updateProfile.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { toast } from "react-toastify";
import { updatePasswordOfUser } from "../../Services/UserService";
import { IoMdArrowBack } from "react-icons/io";
import {Helmet} from "react-helmet";

export default function UpdatePassword({
  toggleProfileMenu,
  toggleChangePassword,
}) {

  const [newPassword, setNewPassword] = useState({
    password: "",
  });

  const handleChange = (event, fieldName) => {
    setNewPassword({
      ...newPassword,
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
      await updatePasswordOfUser(newPassword, getCurrentUserDetail().id);
      toast.success("Password updated successfully");
      handleClosebtn();
    } catch (error) {
      console.error("Error updating Password: ", error);
      toast.error("Error updating Password");
    }
  };

  const handleClosebtn = () => {
    toggleChangePassword();
  };

  const handleBackbtn = () => {
    toggleChangePassword();
    toggleProfileMenu();
  };

  return (
    <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Change Password | Strengthen Your Security</title>
      <link rel="canonical" href="http://localhost:3000/user/update-blog/:blogId" />
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
            {/* Password */}
            <TextField
              id="standard-basic"
              label="New Password"
              variant="standard"
              className="w-100per"
              type="password"
              value={newPassword.password}
              onChange={(event) => handleChange(event, "password")}
            />
            <br />
            <br />

            <button
              className="br-6px bc-trans fs-1_2vw fw-600 b-r pt-5px pb-5px pl-20px pr-20px"
              onClick={handleUpdateBtn}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
