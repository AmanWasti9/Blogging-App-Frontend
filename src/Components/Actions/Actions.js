// Actions.js
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../Auth/Auth";

export const useLogoutAndNavigate = () => {
  const navigate = useNavigate();

  const logoutAndNavigate = () => {
    doLogout(() => {
      navigate("/register-and-login");
    });
  };

  return logoutAndNavigate;
};
