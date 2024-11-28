import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/Constant";
import ReactPaginate from "react-paginate";
import { UserContext } from "../context/UserContext";

const WhitelistUsers = () => {
  const { showUsers, currentPage, totalPages, setCurrentPage, allUsers } =
    useContext(UserContext);
  
  const updateUser = async (userId, isChecked) => {
    try {
      const response = await axios.put(
        `http://${apiUrl}/users/admin/whitelist`,
        { UserId: userId, isWhitelisted: isChecked }
      );
      if (response.status) {
        toast.success(response.data.message);
        allUsers();
      }
    } catch (error) {}
  };


  const handlePageClick = useCallback((event) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
    allUsers(newPage);
  },[setCurrentPage, allUsers]);


  const handleCheck = useCallback((userId, isChecked) => {
    updateUser(userId, isChecked);
  },[updateUser])

  useEffect(() => {
    allUsers(currentPage);
  }, []);

  useEffect(() => {
    if (showUsers.length === 0) {
      allUsers(); // Fetch users once when the component mounts
    }
  }, [showUsers]);
  return (
    <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      {showUsers.length > 0 ? (
        <>
          <table className="min-w-full table-auto text-gray-300">
            <thead className="bg-gray-900 text-left">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Books Issued</th>
                <th className="px-4 py-2">Outstanding fine</th>
                <th className="px-4 py-2">Whitelist Status</th>
              </tr>
            </thead>
            <tbody>
              {showUsers.map((value, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-2 font-bold">{value.id}</td>
                  <td className="px-4 py-2 font-bold">{value?.name}</td>
                  <td className="px-4 py-2 font-bold">
                    {value?.booksIssued ? value?.booksIssued : "N/A"}
                  </td>
                  <td className="px-4 py-2 font-bold">
                    {value?.outstandingFine ? value?.outstandingFine : "N/A"}
                  </td>
                  <td className="px-4 py-2 font-bold">
                    <select
                      value={
                        value.isWhitelisted ? "Whitelisted" : "Not Whitelisted"
                      }
                      onChange={(e) =>
                        handleCheck(value.id, e.target.value === "Whitelisted")
                      }
                      className="form-select bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Whitelisted">Whitelisted</option>
                      <option value="Not Whitelisted">Blacklisted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={
              <button
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium text-white ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700"
                } rounded `}
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
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-6 space-x-2"}
            pageClassName={
              "px-4 py-2 text-sm font-medium border rounded hover:bg-blue-100 text-gray-700 bg-blue"
            }
            activeClassName={"bg-blue-500 text-white border-blue-500"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            forcePage={currentPage - 1}
          />
        </>
      ) : (
        <p className="text-white text-center">No users available.</p>
      )}
    </div>
  );
};

export default WhitelistUsers;
