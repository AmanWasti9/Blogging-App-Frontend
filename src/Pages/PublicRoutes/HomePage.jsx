import React, { useEffect } from "react";
import Home from "../../Components/Home/Home";
import TrendingSection from "../../Components/TrendingSection/TrendingSection";
import { Container } from "@mui/material";
import AllBlogs from "../../Components/AllBlogs/AllBlogs";
import AllCategory from "../../Components/AllCategory/AllCategory";
import { Helmet } from "react-helmet";
import GoToTop from "../../Components/GoToTop/GoToTop";

export default function HomePage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Beacon | Insights, Inspiration, and Information</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>

      <Home />

      <Container
        maxWidth="lg"
        style={{ paddingTop: "2rem", paddingBottom: "5rem" }}
      >
        <section style={{ marginTop: "2rem", marginBottom: "5rem" }}>
          <TrendingSection />
        </section>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.1), rgba(0,0,0,0.02))",
            // background: "#112240",
            margin: "1rem 0 4rem",
            borderRadius: "50%",
          }}
        />

        <section style={{ marginBottom: "4rem" }}>
          <div
            className="Category-mobile"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <AllCategory />
          </div>
        </section>

        <section style={{ marginBottom: "5rem" }}>
          <AllBlogs />
        </section>
      </Container>

      <GoToTop />
    </div>
  );
}
