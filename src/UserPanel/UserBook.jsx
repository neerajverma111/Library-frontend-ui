import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../context/BookContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/Constant";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { decodeToken } from "../constants/Jwt-Decode";

const UserBook = () => {
  const navigate = useNavigate();
  const [isBookIssued, setIsBookIssued] = useState();
  const {
    data,
    getBooks,
    totalPages,
    currentPage,
    issuedBooks,
    setIssuedBooks,
    isLoading,
    setCurrentPage,
    setIsLoading,
  } = useContext(BookContext);
  // const { users } = useContext(UserContext);
  const [issueDetails, setIssueDetails] = useState({
    userId: "",
    bookModelId: "",
  });

  const jwtToken = localStorage.getItem("token");

  const loggedInUser = jwtToken ? decodeToken(jwtToken) : null;

  const issueBook = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://${apiUrl}/issues/issueBook`,
        {
          userId: issueDetails.userId,
          bookModelId: issueDetails.bookModelId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setIsBookIssued(response.data);
      setIssuedBooks((prev) => [...prev, issueDetails.bookModelId]); //
      toast.success(response?.data?.message);
      getBooks();
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === "jwt expired") {
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
        console.error("Response Status:", err.response.status);
        console.error("Response Data:", err.response.data);
        toast.error(err.response.data.message || "Something went wrong!");
      } else {
        toast.error("Network error or server not reachable");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
    getBooks(newPage);
  };

  useEffect(() => {
    if (issueDetails.userId && issueDetails.bookModelId) {
      console.log("this is issue books ", issueDetails);
      issueBook(issueDetails);
    }
  }, [issueDetails]);

  // console.log(":::::::::::::::::::::datatatatata",data)

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Book List</h2>

          {data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100 text-gray-700 ">
                  <tr>
                    <th className="px-4 py-2 text-lg">#</th>
                    <th className="px-4 py-2 text-lg">Book Name</th>
                    <th className="px-4 py-2 text-lg">Department</th>
                    <th className="px-4 py-2 text-lg">Quantity</th>
                    <th className="px-4 py-2 text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((book, bookIdx) => (
                    <tr
                      key={bookIdx}
                      className="border-t hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-2 text-base ">{book.id}</td>
                      <td className="px-4 py-2 text-base">{book.name}</td>
                      <td
                        className={`${
                          book.quantity === 0 ? "text-red-600" : ""
                        } px-4 py-2 text-base`}
                      >
                        {book.department}
                      </td>
                      <td
                        className={`${
                          book.quantity === 0 ? "text-red-600" : ""
                        } px-4 py-2 text-base text-center`}
                      >
                        {book.quantity}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIssueDetails({
                              userId: loggedInUser.data.id, // Set userId from logged-in user
                              bookModelId: book.id,
                            });
                            // issueBook(loggedInUser.data.id, book.id);
                            // handleIssueBook(loggedInUser.data.id, book.id);
                          }}
                          className={`${
                            book.quantity === 0
                              ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                              : "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                          }`}
                          disabled={book.quantity === 0}
                        >
                          Issue
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={
                  <button
                    disabled={currentPage === 1} // Disable button on the first page
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
                    disabled={currentPage === totalPages} // Disable button on the last page
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
                  <span className="px-3 py-2 text-sm font-medium text-gray-500">
                    ...
                  </span>
                }
                pageCount={totalPages} // Total pages calculation
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick} // Handle direct page clicks
                containerClassName={"flex justify-center mt-6 space-x-2"}
                pageClassName={
                  "px-4 py-2 text-sm font-medium border rounded hover:bg-blue-100 text-gray-700 bg-blue"
                }
                activeClassName={"bg-blue-500 text-white border-blue-500"}
                disabledClassName={"opacity-50 cursor-not-allowed"}
                forcePage={currentPage - 1} // Sync with ReactPaginate (0-indexed)
              />
            </div>
          ) : (
            <p className="text-center text-gray-600">No books available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserBook;
