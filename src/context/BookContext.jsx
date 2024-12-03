// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { apiUrl } from "../constants/Constant";
// import { toast } from "react-toastify";

// export const BookContext = createContext();

// export const BookProvider = ({ children }) => {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [data, setData] = useState([]);
//   const [itemsPerPage] = useState(8);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalBooks, setTotalBooks] = useState(0);

//   const getBooks = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `http://${apiUrl}/books?page=${page}&limit=${itemsPerPage}`
//       );
//       if (response.status === 200) {
//         setTotalPages(response.data.totalPages);
//         setTotalBooks(response.data);
//         setData(response.data.books);
//         setCurrentPage(response.data.currentPage);
//       }
//     } catch (error) {
//       console.error("Failed to fetch books:", error.message);
//       toast.error("Failed to fetch books.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (data.length === 0) {
//       getBooks()
//     }
//   })

  
//   return (
//     <BookContext.Provider
//       value={{
//         totalBooks,
//         data,
//         setData,
//         getBooks,
//         issuedBooks, // Expose issued books
//         setIssuedBooks, // Expose setter
//         totalPages,
//         currentPage,
//         isLoading,
//         setCurrentPage,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </BookContext.Provider>
//   );
// };





import React, { createContext, useEffect } from "react";
import { apiUrl } from "../constants/Constant";
import usePagination from "../Hooks/usePagination";
import useFetchBooks from "../Hooks/useFetchBook";
import useIssuedBooks from "../Hooks/useIssuedBooks";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    itemsPerPage,
  } = usePagination(8);
  const { data, setData, isLoading, fetchBooks } = useFetchBooks(
    `http://${apiUrl}`
  );
  const { issuedBooks, setIssuedBooks } = useIssuedBooks();

  useEffect(() => {
    fetchBooks(currentPage, itemsPerPage).then((result) => {
      if (result) {
        setTotalPages(result.totalPages);
      }
    });
  }, [currentPage]);

  return (
    <BookContext.Provider
      value={{
        totalPages,
        currentPage,
        setCurrentPage,
        data,
        setData,
        issuedBooks,
        setIssuedBooks,
        isLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

