// src/hooks/useFetchBooks.js
import { useState } from "react";
import axios from "axios";

const useFetchBooks = (apiUrl) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (page, limit) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/books?page=${page}&limit=${limit}`
      );
      if (response.status === 200) {
        setData(response.data.books);
        return response.data;
      }
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, isLoading, fetchBooks };
};

export default useFetchBooks;
