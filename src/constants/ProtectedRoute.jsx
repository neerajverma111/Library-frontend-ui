import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const jwtToken = localStorage.getItem("token");
  //   console.log(jwtToken)

  const token = jwtToken;

  return token ? <Outlet /> : <Navigate to="/" />;
};

// export const ProtectLogin = () => {
//      if()
// }
