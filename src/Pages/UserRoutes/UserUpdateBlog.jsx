import React from "react";
import UpdateBlog from "../../Components/BlogComp/UpdateBlog";
import { Container } from "@mui/material";
import { Helmet } from "react-helmet";

export default function UserUpdateBlog() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Blog | Revise Your Thoughts</title>
        <link
          rel="canonical"
          href="http://localhost:3000/user/update-blog/:blogId"
        />
      </Helmet>

      <Container>
        <UpdateBlog />
      </Container>
    </div>
  );
}
