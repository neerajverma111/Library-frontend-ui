import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminDataCountContext from "../context/AdminDataCountContext";

const AllThingsHere = () => {
  const { count } = useContext(AdminDataCountContext);

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
