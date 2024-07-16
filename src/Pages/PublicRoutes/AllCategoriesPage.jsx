import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { loadAllCategories } from "../../Services/CategoryService";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllCategoriesPage() {
  const [category, setCategory] = useState();

  useEffect(() => {
    const loadAllCat = async () => {
      try {
        const catData = await loadAllCategories();
        setCategory(catData);
      } catch (error) {
        console.log(error);
      }
    };
    loadAllCat();
  }, []);

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Categories | Explore Topics and Themes</title>
        <link rel="canonical" href="http://localhost:3000/categories" />
      </Helmet>
      <div>
        <br />
        <center>
          <h2>All Categories</h2>
        </center>
        <br />

        {/* <Searchbar /> */}
        <center>
          <Grid container spacing={2}>
            {category &&
              category.map((catItem, index) => (
                <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                  <Link
                    to={"/category/" + catItem.categoryId}
                    className="c-b td-n"
                  >
                    <p style={{ fontSize: "17px" }}>{catItem.categoryTitle}</p>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </center>
      </div>
    </Container>
  );
}
