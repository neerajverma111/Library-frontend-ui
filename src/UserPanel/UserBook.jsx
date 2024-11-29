import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../context/BookContext";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/Constant";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { decodeToken } from "../constants/Jwt-Decode";
import SkeletonLoading from "../constants/Loading/SkeletonLoading";

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
  // useEffect(() => {
  //   getBooks();
  // }, [!issueDetails.userId]);
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
      toast.dismiss();
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
        toast.dismiss();
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

  // console.log(":::::::::::::::::::::datatatatata", data);

  return (
    <>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Book List</h2>
          <form class="max-w-md mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative -mt-14 mb-3 ml-[320px]">
              <div class=" absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-[300px] h-12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Novel"
              
              />
              <button
                type="submit"
                class="text-white absolute start-[19.5vw] bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

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
            <SkeletonLoading />
          )}
        </div>
      )}
    </>
  );
};

export default UserBook;
