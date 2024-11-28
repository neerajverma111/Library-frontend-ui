import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { apiUrl, jwtToken } from "../constants/Constant";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showUsers, setShowUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const allUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://${apiUrl}/users/admin/get-all-users?page=${page}&limit=${itemsPerPage}`,
        jwtToken
      );
      if (response.status === 200) {
        setTotalPages(response?.data?.totalPages);
        setTotalUsers(response?.data?.totalUsers);
        setShowUsers(response?.data?.users);
        setCurrentPage(response?.data?.currentPage);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Failed to fetch users.");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        totalUsers,
        allUsers,
        setShowUsers,
        showUsers,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
