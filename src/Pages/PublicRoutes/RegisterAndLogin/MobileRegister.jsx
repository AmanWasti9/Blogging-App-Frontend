import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Container } from "@mui/material";
import { loginUser, signUp } from "../../../Services/UserService";
import { toast } from "react-toastify";
import { doLogin } from "../../../Auth/Auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Context/UserContext";
import "./RegisterAndLogin.css";

export default function MobileRegister() {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // State to toggle between login and register forms
  const [showLoginForm, setShowLoginForm] = useState(false);

  //Handle Change
  const handleChange = (event, property) => {
    //Dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  // submitting the form
  const submitForm = async (event) => {
    
    // Call Server API for Sending the Data
    try {
      event.preventDefault();

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
      console.log(error);
      // Handle error
      setError({
        errors: error,
        isError: true,
      });
    }
  };

  // Login Form Logic
  
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


  const submitLoginForm = async (event) => {
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

  // Function to toggle between login and register forms
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
      <Container>
        <div className="d-f al-c jc-c">
          {/* Register Form */}
          <Form
            className="reg-form"
            onSubmit={submitForm}
            style={{
              border: "2px solid var(--black)",
              backgroundColor:'var(--black)',
              color:'white',
              padding: "20px",
              borderRadius: "20px",
              display: showLoginForm ? "none" : "block",
            }}
          >
            {/* Name  */}
            <FormGroup>
              <Label for="name">Username</Label>
              <Input
                type="text"
                placeholder="Username"
                id="name"
                onChange={(e) => handleChange(e, "name")}
                value={data.name}
                invalid={error.errors?.response?.data?.name ? true : false}
                style={{
                  outline:'none'
                }}
              />

              <FormFeedback>
                {error.errors?.response?.data?.name || ""}
              </FormFeedback>
            </FormGroup>

            {/* Email  */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                invalid={error.errors?.response?.data?.email ? true : false}
              />

              <FormFeedback>
                {error.errors?.response?.data?.email || ""}
              </FormFeedback>
            </FormGroup>

            {/* Password  */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
                invalid={error.errors?.response?.data?.password ? true : false}
              />

              <FormFeedback>
                {error.errors?.response?.data?.password || ""}
              </FormFeedback>
            </FormGroup>
            <Container className="text-center">
              <Button
                style={{
                  backgroundColor: "var(--black)",
                  border: "2px solid white",
                }}
              >
                Sign Up
              </Button>
            </Container>
            <hr />
            <center>
              <p>
                Already have an account ?{" "}
                <span className="cur-p td-u c-blu" onClick={toggleForm}>
                  Login
                </span>
              </p>
            </center>
          </Form>



          {/* Login Form */}
          <Form
            className="login-form"
            onSubmit={submitLoginForm}
            style={{
              border: "2px solid var(--black)",
              padding: "20px",
              backgroundColor:'var(--black)',
              color:'white',
              borderRadius: "20px",
              display: showLoginForm ? "block" : "none",
            }}
          >
            {/* Email */}
            <FormGroup>
              <Label for="login-email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="login-email"
                onChange={(e) => handleLoginChange(e, "username")}
                invalid={error.errors?.response?.data?.username ? true : false}
              />

              <FormFeedback>
                {error.errors?.response?.data?.username || ""}
              </FormFeedback>
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Label for="login-password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="login-password"
                onChange={(e) => handleLoginChange(e, "password")}
                invalid={error.errors?.response?.data?.password ? true : false}
              />

              <FormFeedback>
                {error.errors?.response?.data?.password || ""}
              </FormFeedback>
            </FormGroup>
            <Container className="text-center">
              <Button
                style={{
                  backgroundColor: "var(--black)",
                  border: "2px solid white",
                }}
              >
                Login
              </Button>
            </Container>
            <hr />
            <center>
              <p>
                Don't have an account ?{" "}
                <span className="cur-p td-u c-blu" onClick={toggleForm}>
                  Register
                </span>
              </p>
            </center>
          </Form>
        </div>
      </Container>
    </>
  );
}
