import React from "react";
import Home from "../../Components/Home/Home";
import TrendingSection from "../../Components/TrendingSection/TrendingSection";
import { Container } from "@mui/material";
import AllBlogs from "../../Components/AllBlogs/AllBlogs";
import AllCategory from "../../Components/AllCategory/AllCategory";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <div>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Beacon | Insights, Inspiration, and Information</title>
          <link rel="canonical" href="http://localhost:3000/" />
        </Helmet>

        <Home />
        <br />
        <TrendingSection />
        <hr />
        <div className="Category-mobile">
          <div>
            <AllCategory />
          </div>
          <hr />
        </div>

        <AllBlogs />
      </Container>
    </div>
  );
}
