import React from "react";
import WriteBlog from "../../Components/WriteBlog/WriteBlog";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";

export default function UserWriteBlog() {
  return (
    <div>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Write New Blog | Share Your Thoughts</title>
          <link rel="canonical" href="http://localhost:3000/user/write-blog" />
        </Helmet>

        <WriteBlog />
      </Container>
    </div>
  );
}
