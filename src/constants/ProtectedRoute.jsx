import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoginUserContext } from "../context/LoginUser";

export const ProtectedRoute = () => {
  const { isAdmin } = useContext(LoginUserContext);
  const jwtToken = localStorage.getItem("token");

  const token = jwtToken;

  if (isAdmin && token) {
    return <Outlet />;
  } else if (token && !isAdmin) {
    return <Outlet />;
  } else {
    <Navigate to="/" replace/>;
  }
};
