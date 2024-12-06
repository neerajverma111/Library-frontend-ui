import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, GET_ALL_USERS_URL, GET_BOOKS_URL } from "../../constants/Constant";
import { toast } from "react-toastify";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        headers.set("Authorization", `Bearer ${currentToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users", "Books"],
  endpoints: (builder) => ({
    //Users Endpoints.
    getAllUsers: builder.query({
      query: ({ page = 1, itemsPerPage }) => ({
        url: GET_ALL_USERS_URL,
        params: { page, limit: itemsPerPage },
        method: "GET",
      }),
      transformResponse: (response) => {
        if (response?.status === 200) {
          return {
            totalPages: response.data.totalPages,
            totalUsers: response.data.totalUsers,
            users: response.data.users,
            currentPage: response.data.currentPage,
          };
        } else if (response.status === 500) {
          toast.error("Token Expired");
        }
        return response;
      },
      providesTags: ["Users"],
    }),

    //Books Endpoints
    getBooks: builder.query({
      query: ({ page = 1, itemsPerPage }) => ({
        url: GET_BOOKS_URL,
        params: { page, limit: itemsPerPage },
        method: "GET",
      }),
      transformResponse: (response) => {
        if (response?.status === 200) {
          return {
            books: response.data.books,
            totalPages: response.data.totalPages,
            totalBooks: response.data.totalBooks,
            currentPage: response.data.currentPage,
          };
        }
        return response;
      },
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetBooksQuery } = apiSlice;
