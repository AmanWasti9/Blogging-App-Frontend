import React from "react";
import { Container } from "@mui/material";
import './Footer.css';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <Container>
        <div className="footer-content">
          <center>
            <div style={{ 
              marginBottom: "20px", 
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
              fontSize: "1.5rem"
            }}>
              Beacon
            </div>
            <div style={{ 
              maxWidth: "500px", 
              margin: "0 auto 20px", 
              fontSize: "14px", 
              color: "#666",
              lineHeight: "1.6",
              fontFamily: "'Poppins', sans-serif"
            }}>
              Discover stories, thinking, and expertise from writers on any topic.
            </div>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/our-story" className="footer-link">About</Link>
              <Link to="/all-blogs" className="footer-link">Blogs</Link>
              <Link to="/categories" className="footer-link">Categories</Link>
              <Link to="/user/write-blog" className="footer-link">Write</Link>
              <div className="footer-link">Privacy</div>
              <div className="footer-link">Terms</div>
            </div>
            <div style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>
              © {new Date().getFullYear()} Beacon. All rights reserved.
            </div>
          </center>
        </div>
      </Container>
    </div>
  );
}
