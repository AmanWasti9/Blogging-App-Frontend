import React from "react";
import { Container } from "@mui/material";
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer-container" style={{
      marginTop:'50px'
    }}>
      <Container>
        <hr />

        <div className="footer-content">
          <center>
            <div className="footer-links">
            <div className="footer-link">Help</div>
            <div className="footer-link">Status</div>
            <div className="footer-link">Privacy</div>
            <div className="footer-link">Terms & Conditions</div>
            <div className="footer-link">Our team</div>
          </div>
          </center>
          
        </div>
      </Container>
    </div>
  );
}
