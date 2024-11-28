import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { BookContext } from "../context/BookContext";

const ReusablePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={
        <button
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium text-white ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700"
          } rounded`}
        >
          Prev
        </button>
      }
      nextLabel={
        <button
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium text-white ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700"
          } rounded`}
        >
          Next
        </button>
      }
      breakLabel={
        <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
      }
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={(selected) => onPageChange(selected.selected + 1)} // Send 1-indexed page number
      containerClassName={"flex justify-center mt-6 space-x-2"}
      pageClassName={
        "px-4 py-2 text-sm font-medium border rounded hover:bg-blue-100 text-gray-700"
      }
      activeClassName={"bg-blue-500 text-white border-blue-500"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
      forcePage={currentPage - 1} // Sync with ReactPaginate (0-indexed)
    />
  );
};

export default ReusablePagination;
