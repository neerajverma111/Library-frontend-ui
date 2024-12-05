import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issuedBooks: [],
  data: [],
  itemsPerPage: 8,
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  totalBooks: 0,
};

export const bookSlice = createSlice({
  name: "book-list",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setBooks: (state, action) => {
      state.data = action.payload.books;
      state.totalPages = action.payload.totalPages;
      state.totalBooks = action.payload.totalBooks;
    },
    setIssuedBooks: (state, action) => {
      state.issuedBooks = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setBooks,
  setIssuedBooks,
  setCurrentPage,
} = bookSlice.actions;

export default bookSlice.reducer;
