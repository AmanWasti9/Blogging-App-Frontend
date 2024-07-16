import { Container, Grid } from "@mui/material";
import React from "react";
import OriginStory from "../../Images/OriginStory.jpeg";
import MissionVision from "../../Images/MissionVision.jpeg";
import CommunityFocus from "../../Images/CommunityFocus.jpeg";

export default function OurStoryPage() {
  return (
    <div>
      <Container>
        <div
          style={{
            margin: "15px",
          }}
        >
          <div
            style={{
              margin: "10px 40px",
            }}
          >
            <h1>Introduction</h1>
            <p
              style={{
                textAlign: "justify",
                fontSize: "20px",
              }}
            >
              Welcome to <b>BEACON</b>, a thriving blogging community where
              everyone can express themselves and make connections. With our
              platform, authors of various skill levels may share their
              passions, communicate with like-minded readers, and express their
              ideas.
            </p>
          </div>
          <br />
          <div>
            <Grid container spacing={2} justifyContent="center">
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <h1 style={{ textAlign: "center" }}>The Origin Story</h1>
                  <p style={{ textAlign: "justify", fontSize: "20px" }}>
                    <b>BEACON</b> began with a straightforward concept: to
                    establish a platform where everyone may contribute and be
                    heard. Our journey started in 2024 when Syed Amanullah Wasti
                    saw the need for a welcoming environment that fosters
                    connection and innovation. We've developed into a
                    multicultural community of writers and readers from all
                    around the world since then.
                  </p>
                </div>
              </Grid>
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <img
                    src={OriginStory}
                    style={{
                      objectFit: "contain",
                      width: "90%",
                      aspectRatio: "1/0.7",
                    }}
                  />
                </div>
              </Grid>
              <br />
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <img
                    src={MissionVision}
                    style={{
                      objectFit: "contain",
                      width: "90%",
                      aspectRatio: "1/0.7",
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <h1 style={{ textAlign: "center" }}>Mission and Vision</h1>
                  <p style={{ textAlign: "justify", fontSize: "20px" }}>
                    Our goal is to make blogging more accessible to all people
                    by offering a user-friendly platform on which they can all
                    share their tales. In our ideal future, each person will
                    have a voice and be helped by a caring community. Our
                    mission is to stimulate the creative process, ignite
                    dialogue, and create cross-border relationships.
                  </p>
                </div>
              </Grid>
              <br />
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <h1 style={{ textAlign: "center" }}>Community Focus</h1>
                  <p style={{ textAlign: "justify", fontSize: "20px" }}>
                    Community is at the core of everything we do at{" "}
                    <b>BEACON</b>. We think that every story matters and that
                    shared experiences have great power. We want our platform to
                    be a friendly and secure place where people can post,
                    discuss, and work together. Experienced or novice writers
                    alike will discover a welcoming community eager to interact
                    with your work.
                  </p>
                </div>
              </Grid>
              <Grid
                item
                lg={5}
                md={5}
                sm={5}
                xs={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <img
                    src={CommunityFocus}
                    style={{
                      objectFit: "contain",
                      width: "90%",
                      aspectRatio: "1/0.7",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <br />
          <div
            style={{
              margin: "10px 40px",
              textAlign: "justify"
            }}
          >
            <h1>Features and Benefits</h1>
            <p
              style={{
                fontSize: "20px",
              }}
            >
              A number of features are available on our platform to improve your
              blogging experience:
              <ul
                style={{
                  margin: "10px",
                  fontSize: "20px",
                }}
              >
                <li
                  style={{
                    margin: "10px",
                  }}
                >
                  <b>User-Friendly Interface:</b> just register, log in, and
                  begin creating content for your blog.
                </li>
                <li
                  style={{
                    margin: "10px",
                  }}
                >
                  <b>Customization:</b> Use editable layouts and themes to give
                  your blog a unique look.
                </li>
                <li
                  style={{
                    margin: "10px",
                  }}
                >
                  <b>Community Interaction:</b> Post comments and likes to
                  interact with other authors and readers.
                </li>
                <li
                  style={{
                    margin: "10px",
                  }}
                >
                  <b>Analytics:</b> Use thorough analytics to monitor the
                  performance of your blog.
                </li>
                <li
                  style={{
                    margin: "10px",
                  }}
                >
                  <b>Support:</b> Get the tools and assistance you need to hone
                  your writing abilities.
                </li>
              </ul>
            </p>
          </div>
          <br />
          <div
            style={{
              margin: "10px 40px",
            }}
          >
            <h1>Urge to Take Action</h1>
            <p
              style={{
                fontSize: "20px",
                textAlign: "justify"
              }}
            >
              Are you prepared to tell your story? Register here to become a
              member of our community now. Connect with other writers and stay
              up to date on the newest news. Have comments or inquiries? We
              would like hearing from you! Reach out to us at
              amanwasti890@gmail.com.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
