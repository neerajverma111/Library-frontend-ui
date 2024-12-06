
import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import { apiSlice } from "./rtkQuery/usersApi";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});