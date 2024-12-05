
import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import { usersApi } from "./rtkQuery/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    [usersApi.reducerPath]: usersApi.reducer, // this store is for usersApi rtk query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);