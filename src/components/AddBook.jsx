import React, { useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/Constant";

// Reducer function to handle updates to the state
const bookDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOK_DATA":
      return { ...state, [action.field]: action.value };
    case "RESET_BOOK_DATA":
      return { bookName: "", department: "", quantity: "" };
    default:
      return state;
  }
};

const AddBook = () => {
  const [bookData, dispatch] = useReducer(bookDataReducer, {
    bookName: "",
    department: "",
    quantity: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_BOOK_DATA",
      field: name,
      value: value,
    });
  };

  const handleClick = () => {
    if (bookData.bookName === "") {
      toast.error("Book Name is required.");
      return;
    }

    if (bookData.quantity === "") {
      toast.error("Quantity is required.");
      return;
    }

    if (bookData.department === "") {
      toast.error("Department is required.");
      return;
    }

    addBook();
  };

  const addBook = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `http://${apiUrl}/users/admin/add-book`,
        {
          name: bookData.bookName,
          department: bookData.department,
          quantity: bookData.quantity,
        }
      );
      if (response.status === 201) {
        toast.success("Book Added Successfully");
        dispatch({ type: "RESET_BOOK_DATA" }); // Reset the form
      } else {
        toast.error(response?.data?.message || "Failed to add book");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while adding the book.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-2">
      {isLoading ? (
        <h2 className="text-xl font-bold text-center">Loading...</h2>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Add a Book</h1>
          <div className="mb-4">
            <label htmlFor="book-name" className="block text-sm font-medium">
              Book Name:
            </label>
            <input
              id="book-name"
              name="bookName"
              value={bookData.bookName}
              onChange={handleInputChange}
              type="text"
              placeholder="Harry Potter..."
              className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              name="quantity"
              value={bookData.quantity}
              onChange={handleInputChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[eE+\-]/g, "");
                dispatch({
                  type: "SET_BOOK_DATA",
                  field: "quantity",
                  value: e.target.value,
                });
              }}
              placeholder="e.g. - 5"
              type="number"
              className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium">
              Department:
            </label>
            <input
              id="department"
              name="department"
              value={bookData.department}
              onChange={handleInputChange}
              type="text"
              placeholder="e.g. - Fiction"
              className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className={`text-gray-900 bg-gradient-to-r from-red-200 via-red-300 w-full to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add Book
          </button>
        </>
      )}
    </div>
  );
};

export default AddBook;
