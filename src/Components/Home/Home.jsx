import React from "react";
import mains from "../../Images/Main.jpeg";
import { Container } from "@mui/material";
import { animate, inView } from "motion";
import { useEffect, useRef } from "react";
import "./Home.css";

export default function Home() {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (headingRef.current && subheadingRef.current && ctaRef.current) {
      // Animate the heading
      inView(headingRef.current, () => {
        animate(
          headingRef.current,
          { opacity: [0, 1], y: [50, 0] },
          { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] }
        );
        return () => {};
      });

      // Animate the subheading with a delay
      inView(subheadingRef.current, () => {
        animate(
          subheadingRef.current,
          { opacity: [0, 1], y: [30, 0] },
          { duration: 0.8, delay: 0.3, easing: [0.17, 0.55, 0.55, 1] }
        );
        return () => {};
      });

      // Animate the CTA button with a delay
      inView(ctaRef.current, () => {
        animate(
          ctaRef.current,
          { opacity: [0, 1], scale: [0.9, 1] },
          { duration: 0.5, delay: 0.6, easing: [0.17, 0.55, 0.55, 1] }
        );
        return () => {};
      });
    }
  }, []);

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "3rem" }}>
      <div
        style={{
          backgroundImage: `url(${mains})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          width: "100%",
          height: "90vh",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
            height: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "clamp(2rem, 5vw, 4rem)",
              display: "flex",
              flexDirection: "column",
              maxWidth: "800px",
            }}
          >
            <h1
              ref={headingRef}
              className="heading-xl stroke-text"
              style={{ marginBottom: "1.5rem" }}
            >
              Unlock <br /> Your Creativity
            </h1>
            <p
              ref={subheadingRef}
              className="body-text-lg"
              style={{ marginBottom: "2rem", maxWidth: "600px" }}
            >
              Explore Limitless Possibilities with Our Dynamic Blogging Hub.
              Share your stories, connect with like-minded creators, and inspire
              the world.
            </p>
            <div ref={ctaRef}>
              <a
                href="/user/write-blog"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  padding: "0.8rem 2rem",
                  borderRadius: "30px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "600",
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(232, 90, 79, 0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                Start Writing
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
