import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import { useLogoutAndNavigate } from "../Actions/Actions";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import "./Navbar.css";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import Logo from "../../Images/Logo.png";

export default function Navbar() {
  const logoutAndNavigate = useLogoutAndNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const showMenuBarContent = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const navItems = isLoggedIn()
    ? [
        { name: "All Blogs", path: "/all-blogs" },
        { name: "Liked", path: "/user/liked-blogs" },
        { name: "Saved", path: "/user/saved-blogs" },
        { name: "Categories", path: "/categories" },
        { name: "Write", path: "/user/write-blog" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Our Story", path: "/our-story" },
        { name: "All Blogs", path: "/all-blogs" },
        { name: "Write", path: "/user/write-blog" },
        { name: "SignIn", path: "/register-and-login" },
      ];

  if (isLoggedIn()) {
    navItems.splice(2, 0, {
      name: "My Profile",
      path: "/user/user-profile/" + getCurrentUserDetail().id,
    });
  }

  const MenuContent = (
    <div className="Mobile-Nav">
      <Container style={{ marginBottom: "20px" }}>
        <div>
          {navItems.map((item, index) => (
            <span key={index}>
              <div>
                <Link to={item.path} className="td-n">
                  <p>{item.name}</p>
                </Link>
              </div>
            </span>
          ))}
          {isLoggedIn() ? (
            <>
              <span>
                <div
                  onClick={logoutAndNavigate}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  LogOut
                </div>
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );

  return (
    <div className="main-nav">
      <Container>
        <div
          className="d-f al-c jc-b"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            padding: "5px 20px",
          }}
        >
          <div>
            <img
              src={Logo}
              alt=""
              style={{
                width: "70px",
              }}
            />
          </div>
          <div>
            <h2 className="text-center nav-brands">Beacon</h2>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {isLoggedIn() ? (
              <>
                <div className="logout_bt" onClick={logoutAndNavigate}>
                  Logout
                </div>
              </>
            ) : (
              <Link className="td-n logout_bt" to="/register-and-login">
                <p>Get Started</p>
              </Link>
            )}
          </div>
          <div className="menu_bt" onClick={showMenuBarContent}>
            {isMenuOpen ? (
              <IoCloseSharp className="cursor-pointer menu-icons-bar" />
            ) : (
              <IoMenuSharp className="cursor-pointer menu-icons-bar" />
            )}
          </div>
        </div>

        <hr style={{ width: "100%" }} />

        <div className="d-f al-c jc-c lists">
          {navItems.map((item, index) => (
            <span key={index} className="aa">
              <div>
                <Link
                  to={item.path}
                  className={`td-n ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <p>{item.name}</p>
                </Link>
              </div>
            </span>
          ))}
        </div>

        {isMenuOpen && <>{MenuContent}</>}
      </Container>
    </div>
  );
}
