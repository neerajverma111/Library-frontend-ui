// import { Outlet } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// export const AuthGuard = () => {
//   const navigate = useNavigate();

//   const jwtToken = localStorage.getItem("token");

//   const token = jwtToken;

//   console.log("object333", token);

//   token ? <Outlet /> : <Navigate to={"/"} />;
// };

import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
// import { ROUTES } from "../utils/constants";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(auth);

  useEffect(() => {
    if (!auth) {
      <Navigate to="/" />;
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem("token") === null) navigate("/");
    });
  }, []);

  return auth ? children : <Navigate to={"/"} />;
};

export default AuthGuard;
