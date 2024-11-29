import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoginUserContext } from "../context/LoginUser";

export const AdminProtectedRoute = () => {
    debugger
  const { isAdmin } = useContext(LoginUserContext);
  const jwtToken = localStorage.getItem("token");
  //   const isAdmin = localStorage.getItem("isAdmin");
  const token = jwtToken;
  console.log(isAdmin);
  if (isAdmin && token) {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
};
