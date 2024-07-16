import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { toast } from "react-toastify";
import { getUserById, updateEmailOfUser } from "../../Services/UserService";
import { IoMdArrowBack } from "react-icons/io";
import { showConfirmationDialog } from "../SweetAlert/SweetAlert";
import { useLogoutAndNavigate } from "../Actions/Actions";
import {Helmet} from "react-helmet";

export default function UpdateEmail({ toggleProfileMenu, toggleChangeEmail }) {
  const [newEmail, setNewEmail] = useState({
    email: "",
  });

  const logout = useLogoutAndNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(getCurrentUserDetail().id);
        setNewEmail(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (event, fieldName) => {
    setNewEmail({
      ...newEmail,
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
      const shouldUpdate = await showConfirmationDialog(
        "Update Email!",
        "Are you sure, you want to update this email?",
        "Yes",
        "No"
      );

      if (shouldUpdate) {
        await updateEmailOfUser(newEmail, getCurrentUserDetail().id);
        toast.success("Email updated successfully");
        handleClosebtn();
        logout();
      }
    } catch (error) {
      console.error("Error updating Emai: ", error);
      toast.error("Error updating Email");
    }
  };

  const handleClosebtn = () => {
    toggleChangeEmail();
  };

  const handleBackbtn = () => {
    toggleChangeEmail();
    toggleProfileMenu();
  };

  return (
    <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Change Email | Update Your Contact Information</title>
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
              label="New Email"
              variant="standard"
              className="w-100per"
              value={newEmail.email}
              onChange={(event) => handleChange(event, "email")}
            />
            <br />
            <br />

            <button
              className="br-6px bc-trans fs-1_2vw fw-600 b-r pt-5px pb-5px pl-20px pr-20px"
              onClick={handleUpdateBtn}
            >
              Change Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
