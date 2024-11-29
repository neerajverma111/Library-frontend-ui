import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl, jwtToken } from "../constants/Constant";

const AllThingsHere = () => {
  const [count, setCount] = useState({
    booksCount: "",
    usersCount: "",
  });
  const getCount = async () => {
    try {
      const response = await axios.get(
        `http://${apiUrl}/users/admin/count-book-user`,
        jwtToken
      );
      if (response.status === 200) {
        setCount({
          booksCount: response.data.books,
          usersCount: response.data.users,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/book-list">
          <div className="p-6 bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Total Books
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {count.booksCount ? count?.booksCount : 0} Books
            </p>
          </div>
        </Link>

        <Link to={"/user-list"}>
          <div className="p-6 bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Users
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {count.usersCount ? count?.usersCount : 0} Users
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AllThingsHere;
