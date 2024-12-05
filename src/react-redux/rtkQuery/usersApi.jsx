import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl, token } from "../../constants/Constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${apiUrl}`,
    prepareHeaders: (headers) => {
      // Use the token directly from localStorage to ensure it's always current
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        headers.set("Authorization", `Bearer ${currentToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, itemsPerPage }) => ({
        url: 'users/admin/get-all-users',
        params: { page, limit: itemsPerPage },
        method: 'GET',
      }),
      transformResponse: (response) => {
        if (response?.status === 200) {
          return {
            totalPages: response.data.totalPages,
            totalUsers: response.data.totalUsers,
            users: response.data.users,
            currentPage: response.data.currentPage,
          };
        } else if(response.status === 500){
          toast.error("Token Expired");
          navigate('/');
        }
        return response;
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;