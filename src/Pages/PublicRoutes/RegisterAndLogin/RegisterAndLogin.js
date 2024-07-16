import React, { useContext, useState } from "react";
import * as Components from "./Components";
import "./RegisterAndLogin.css";
import { FormFeedback } from "reactstrap";
import { toast } from "react-toastify";
import { loginUser, signUp } from "../../../Services/UserService";
import { doLogin } from "../../../Auth/Auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Context/UserContext";

export default function RegisterAndLogin() {
  const [signIn, toggle] = React.useState(true);

  // Sign up Integration

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //Handle Change
  const handleChange = (event, property) => {
    //Dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  // submiting the form
  const submitForm = async (event) => {
    event.preventDefault();

    // Data Validate

    try {
      await signUp(data);
      toast.success("User is registered successfully");
      setData({
        name: "",
        email: "",
        password: "",
      });
      setError({
        errors: {},
        isError: false,
      });
    } catch (error) {
      console.error("Error in signup:", error);
      // Handle error
      setError({
        errors: error,
        isError: true,
      });
    }
  };

  //   Login integration

  const navigate = useNavigate();

  const userContextData = useContext(UserContext);

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  //Handle Change
  const handleLoginChange = (event, field) => {
    let actualValue = event.target.value;
    //Dynamic setting the values
    setLoginDetail({ ...loginDetail, [field]: actualValue });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password is required");
      return;
    }

    try {
      // Submit data to server to generate token
      const data = await loginUser(loginDetail);
      // Save the data to Session storage
      doLogin(data, () => {
        // Redirect to user dashboard page
        userContextData.setUser({
          data: data.user,
          login: true,
        });
        navigate("/all-blogs");
      });

      toast.success("User is Logged In successfully");
      setLoginDetail({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Error in signIn", error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 404)
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on server");
      }
    }
  };

  return (
    <>
      <div className="main-div">
        <Components.Container>
          <Components.SignUpContainer signinin={signIn}>
            <Components.Form onSubmit={submitForm}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                placeholder="Name"
                onChange={(e) => handleChange(e, "name")}
                value={data.name}
                invalid={error.errors?.response?.data?.name ? true : false}
              />
              <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
              <Components.Input
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                invalid={error.errors?.response?.data?.email ? true : false}
              />
              <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
              <Components.Input
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
                invalid={error.errors?.response?.data?.password ? true : false}
              />
              <FormFeedback>
                {error.errors?.response?.data?.password}
              </FormFeedback>{" "}
              <Components.Button>Sign Up</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinin={signIn}>
            <Components.Form onSubmit={handleLoginSubmit}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type="email"
                placeholder="Email"
                value={loginDetail.username}
                onChange={(e) => handleLoginChange(e, "username")}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                value={loginDetail.password}
                onChange={(e) => handleLoginChange(e, "password")}
              />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button>Sigin In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinin={signIn}>
            <Components.Overlay signinin={signIn}>
              <Components.LeftOverlayPanel signinin={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinin={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter Your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sigin Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </>
  );
}
