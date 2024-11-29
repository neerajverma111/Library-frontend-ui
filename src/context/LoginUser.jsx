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

  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const loginUser = async (values) => {
    try {
      const response = await axios.post(`http://${apiUrl}/users/login`, {
        email: values.email,
        password: values.password,
      });

      // return response.data
      if (response.status === 200) {
        console.log("response data ........", response);
        setIsAdmin(response.data.isAdmin);
        setMessage(response.data.message);
        console.log(response.data.token);
        localStorage.setItem("token", response?.data?.token);
        // localStorage.setItem("Admin", response?.data?.isAdmin);

        // localStorage.setItem("userId", response?.data?.id);
        // setJwtToken(response.data.token);
        return { success: true, message: "Login successful!" };
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
        message,
        loginUser,
        isAdmin,
      }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
