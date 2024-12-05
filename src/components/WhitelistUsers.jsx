import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useGetAllUsersQuery } from "../react-redux/rtkQuery/usersApi";
import { apiUrl, jwtToken } from "../constants/Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const WhitelistUsers = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({
    page,
    itemsPerPage: 8,
  });
  const navigate = useNavigate();
  const updateUser = async (userId, isChecked) => {
    try {
      const response = await axios.put(
        `http://${apiUrl}/users/admin/whitelist`,
        { UserId: userId, isWhitelisted: isChecked },
        jwtToken
      );
      if (response.status) {
        toast.success(response.data.message);
        refetch();
        // getAllUsers();
        // data;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  // Function to handle page change
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleCheck = (userId, isChecked) => {
    updateUser(userId, isChecked);
  };

  useEffect(() => {
    if (data && data.users.length === 0) {
      toast.info("No users available.");
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <h2 className="text-xl font-bold text-center">Loading...</h2>
      ) : error ? (
        <h2 className="text-xl font-bold text-center text-red-500">
          Error loading data
        </h2>
      ) : (
        <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {data?.users?.length > 0 ? (
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
                  {data.users.map((value, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 font-bold">{value.id}</td>
                      <td className="px-4 py-2 font-bold">{value?.name}</td>
                      <td className="px-4 py-2 font-bold">
                        {value?.booksIssued || "N/A"}
                      </td>
                      <td className="px-4 py-2 font-bold">
                        {value?.outstandingFine || "N/A"}
                      </td>
                      <td className="px-4 py-2 font-bold">
                        <select
                          value={
                            value.isWhitelisted
                              ? "Whitelisted"
                              : "Not Whitelisted"
                          }
                          onChange={(e) =>
                            handleCheck(
                              value.id,
                              e.target.value === "Whitelisted"
                            )
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
                    disabled={page === 1}
                    className={`px-4 py-2 text-sm font-medium text-white ${
                      page === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                    } rounded `}
                  >
                    Prev
                  </button>
                }
                nextLabel={
                  <button
                    disabled={page === data?.totalPages}
                    className={`px-4 py-2 text-sm font-medium text-white ${
                      page === data?.totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                    } rounded`}
                  >
                    Next
                  </button>
                }
                pageCount={data?.totalPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center mt-6 space-x-2"
                pageClassName="px-4 py-2 text-sm font-medium border rounded hover:bg-blue-100 text-gray-700"
                activeClassName="bg-blue-500 text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                forcePage={page - 1}
              />
            </>
          ) : (
            <p className="text-white text-center">No users available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default WhitelistUsers;
