import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
export const UserAuth = createContext();

export const UserAuthProvider = ({ children }) => {
  const [userSignUp, setUserSignUp] = useState([]);

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:5050/users/signUp");
      setUserSignUp(response.data);
    } catch (error) {
      console.log("error while Signup user  ", error.message);
    }
  };

  return (
    <UserAuthProvider.Provider value={{ userSignUp }}>
      {children}
    </UserAuthProvider.Provider>
  );
};
