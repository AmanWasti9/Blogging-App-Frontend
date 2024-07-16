import React from "react";
import mains from "../../Images/Main.jpeg";
import { Container } from "@mui/material";
import "./Home.css";

export default function Home() {
  return (
    <Container>
      <div
        style={{
          backgroundImage: `url(${mains})`,
          backgroundSize: "cover",
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            height: "100%",
            color: "white",
          }}
        >
          <br />

          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center vertically
              height: "100%", // Ensure the container takes up the full height
            }}
          >
            <p className="stroke-text">
              Unlock <br /> Your Creativity !
            </p>
            <p className="para">
              Explore Limitless Possibilities with Our Dynamic Blogging Hub
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
