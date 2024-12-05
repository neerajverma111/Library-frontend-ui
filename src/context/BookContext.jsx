import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { apiUrl } from "../constants/Constant";
import { toast } from "react-toastify";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [data, setData] = useState([]);
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const getBooks = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://${apiUrl}/books?page=${page}&limit=${itemsPerPage}`
      );
      if (response.status === 200) {
        setTotalPages(response.data.totalPages);
        setTotalBooks(response.data);
        setData(response.data.books);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
      toast.error("Failed to fetch books.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!data.length) {
      getBooks();
    }
  }, [data]);

  return (
    <BookContext.Provider
      value={{
        totalBooks,
        data,
        setData,
        getBooks,
        issuedBooks, // Expose issued books
        setIssuedBooks, // Expose setter
        totalPages,
        currentPage,
        isLoading,
        setCurrentPage,
        setIsLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
