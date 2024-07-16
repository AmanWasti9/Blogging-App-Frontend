import React, { useContext } from "react";
import "./updateProfile.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { doLogout } from "../../Auth/Auth";

export default function ProfileMenu({ toggleProfileMenu, toggleEditProfile, toggleChangePassword, toggleChangeEmail }) {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);

  // Logout
  const logout = () => {
    doLogout(() => {
      // logged out
      userContextData.setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  };

  const handleClosebtn = () => {
    toggleProfileMenu();
  };

  const handleEditProfile = () => {
    toggleProfileMenu(); // Close the profile menu
    toggleEditProfile(); // Open the Update Profile component
  };

  const handleChangePassword = () => {
    toggleProfileMenu(); // Close the profile menu
    toggleChangePassword(); // Open the Update Profile component
  };

  const handleChangeEmail = () => {
    toggleProfileMenu(); // Close the profile menu
    toggleChangeEmail(); // Open the Update Profile component
  };


  const ProfileNavItems = [
    { name: "Edit Profile Info", onClick: handleEditProfile },
    { name: "Change Password", onClick: handleChangePassword },
    { name: "Change Email", onClick: handleChangeEmail  },
    { name: "Privacy Policy" },
  ];

  return (
    <div>
      <div className="profile-preview">
        <div className="preview">
          <div className="backclose-btn" style={{
            justifyContent:'end',
          }}>
            <IoIosCloseCircleOutline onClick={handleClosebtn} />
          </div>
          <div className="update-profile-textfield">
            {ProfileNavItems.map((item, index) => (
              <React.Fragment key={index}>
                <span className="aa" onClick={item.onClick}>
                  <div style={{ cursor: "pointer" }}>{item.name}</div>
                </span>
                <hr />
              </React.Fragment>
            ))}
            <span className="aa">
              <div>
                <p onClick={logout} style={{ cursor: "pointer" }}>
                  LogOut
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

