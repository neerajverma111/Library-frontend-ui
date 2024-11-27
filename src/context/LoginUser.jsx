import React, { createContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../constants/Constant";

// Create Context
export const LoginUserContext = createContext();

// Provider Component
export const LoginUserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const loginUser = async () => {
    try {
      const response = await axios.post(`http://${apiUrl}/users/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });

      if (response.status === 200) {
        console.log("login:::::::::::", response.data.isAdmin);
        let isAdmin = response.data.isAdmin;
        localStorage.setItem("token", response?.data?.token);
        return {
          success: true,
          message: "Login successful!",
          isAdmin: isAdmin,
        };
      }
      return { success: false, message: "Unexpected status code." };
    } catch (err) {
      setMessage("Login failed. Check credentials.");
      console.error("Error:", err.message);
      return { success: false, message: "Login failed." };
    }
  };

  return (
    <LoginUserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        loginUser,
      }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
