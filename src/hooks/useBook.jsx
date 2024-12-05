import { useDispatch, useSelector } from "react-redux";
import { setBooks, startLoading, stopLoading } from "../react-redux/bookSlice";
import axios from "axios";
import { apiUrl } from "../constants/Constant";

export const useBooks = () => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector((state) => state.book.itemsPerPage);

  const getBooks = async (page = 1) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `http://${apiUrl}/books?page=${page}&limit=${itemsPerPage}`
      );
      if (response.status === 200) {
        dispatch(
          setBooks({
            books: response.data.books,
            totalPages: response.data.totalPages,
            totalBooks: response.data.totalBooks,
            currentPage: response.data.currentPage,
          })
        );
      }
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    } finally {
      dispatch(stopLoading());
    }
  };
  return { getBooks };
};
