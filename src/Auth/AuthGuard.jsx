import { Outlet, Navigate } from "react-router-dom";

export const AuthGuard = () => {
  const jwtToken = localStorage.getItem("token");

  //   console.log(jwtToken)

  const token = jwtToken;
  if (token) {
    token ? <Outlet /> : <Navigate to="/" />;
}
};

// export const ProtectLogin = () => {
//      if()
// }
