// src/hooks/useIssuedBooks.js
import { useState } from "react";

const useIssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  return { issuedBooks, setIssuedBooks };
};

export default useIssuedBooks;
