import { useState } from "react";

const usePagination = (itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    setCurrentPage: handlePageChange,
    totalPages,
    setTotalPages,
    itemsPerPage,
  };
};

export default usePagination;
