export const apiUrl = import.meta.env.VITE_API_URL;

export const token = localStorage.getItem("token");

export const jwtToken = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const ONLY_TOKEN = token;

//API Routes
export const BASE_URL = `http://${apiUrl}`;
export const GET_ALL_USERS_URL = "users/admin/get-all-users";
export const GET_BOOKS_URL = "books";
export const UPDATE_BOOKS_URL = "/users/admin/update-book";
export const UPDATE_USERS_STATUS_URL = "/users/admin/whitelist";

//Routes
export const BOOK_LIST = "/book-list";
export const ADD_BOOK = "/add-book";
export const USER_LIST = "/user-list";
export const ADMIN_DASHBOARD = "/admin-dashboard";
export const USER_DASHBOARD = "/user-dashboard";
export const ISSUE_BOOK = "/issueBook";
export const RETURN_BOOK = "/return-book";
export const PAY_FINE  = "/pay-fine"
export const SIGN_UP = "/Signup"
export const NOT_AUTHORIZED = "/not-authorized"
export const ADMIN = "/admin";