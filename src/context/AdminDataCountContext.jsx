import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { apiUrl, jwtToken } from "../constants/Constant";
import { toast } from "react-toastify";

export const AdminDataCountContext = createContext();

export const AdminDataCountProvider = ({ children }) => {
  const [count, setCount] = useState({
    booksCount: "",
    usersCount: "",
  });
  
  const getCount = async () => {
    try {
      const response = await axios.get(
        `http://${apiUrl}/users/admin/count-book-user`,
        jwtToken
      );
      if (response.status === 200) {
        setCount({
          booksCount: response.data.books,
          usersCount: response.data.users,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    if (!count.booksCount) {
      getCount();
    }
  }, [count]);

  return (
    <AdminDataCountContext.Provider value={{ count, getCount }}>
      {children}
    </AdminDataCountContext.Provider>
  );
};

export default AdminDataCountContext;
