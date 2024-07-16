import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Auth/Auth";

export default function PrivateRoutes() {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/register-and-login"} />;
}
