import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { userName } from "../constants/Jwt-Decode";
import { decodeToken } from "../constants/Jwt-Decode";
import { IssueContext } from "../context/IssueContext";
const User = () => {
  const navigate = useNavigate();

  const jwt_token = localStorage.getItem("token");
  const userName = decodeToken(jwt_token).data.username;

  const handleLogout = () => {
    toast.success("User logged out !!");

    setTimeout(() => {
      localStorage.clear(); // Clear localStorage
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 overflow-hidden"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to={"/user-dashboard"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    class="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 22.5 23"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span class="ms-3 font-bold  ml-2">{`Hello ` + userName}</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/issueBook"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src="/icons8-book-100.png" alt="" className="h-7 w-7 " />
                <span class="flex-1 ms-3 whitespace-nowrap">Issue Books</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/pay-fine"}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                
              >
                <img src="/image.png" alt="" className="h-7 w-7 " />
                <span class="flex-1 ms-3 whitespace-nowrap">Pay Fine</span>
              </Link>
            </li>
            <li>
              <Link
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mt-[63vh]"
                onClick={handleLogout}
              >
                <img src="/7124045_logout_icon.png" className="h-7 w-7 " />

                <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default User;
