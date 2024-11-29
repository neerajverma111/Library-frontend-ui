import axios from "axios";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { apiUrl, jwtToken } from "../constants/Constant";
import { BookContext } from "../context/BookContext";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { ErrorMessage, Formik } from "formik";
import InputFields from "../constants/InputFields";

const BookList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [book, setBook] = useState(null);

  const {
    data,
    getBooks,
    totalPages,
    currentPage,
    isLoading,
    setCurrentPage,
    setIsLoading,
  } = useContext(BookContext);

  const updateBook = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://${apiUrl}/users/admin/update-book`,
        {
          bookId: book.id,
          name: values.newBookName,
          department: values.newDepartment,
          quantity: values.newQuantity,
        },
        jwtToken
      );
      if (response.status === 201) {
        toast.success(response.data.name);
        getBooks();
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error in Book List", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isClickedRef = useRef(false);
  
  const handleEditClick = useCallback((book) => {
    setSelectedBook(book);
    isClickedRef.current = true;
    setIsModalOpen(true);
  }, []);

  // console.log(handleEditClick)

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBook(null);
  }, []);

  const handlePageClick = useCallback((event) => {
    const newPage = event.selected + 1; // Convert 0-indexed to 1-indexed
    setCurrentPage(newPage);
    getBooks(newPage);
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      getBooks(currentPage);
    }
  }, [data]);
  return (
    <>
      {!isLoading ? (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="w-full ">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold">Book List</h2>
              <Link to={"/add-book"}>
                <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Add Book
                </button>
              </Link>
            </div>
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-lg">#</th>
                      <th className="px-4 py-2 text-lg">Name</th>
                      <th className="px-4 py-2 text-lg">Department</th>
                      <th className="px-4 py-2 text-lg">Quantity</th>
                      <th className="px-4 py-2 text-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition duration-200"
                      >
                        <td
                          className={`${
                            value.quantity === 0
                              ? "text-red-600 px-4 py-2 whitespace-nowrap"
                              : "px-4 py-2 text-base"
                          }`}
                        >
                          {value.id}
                        </td>
                        <td
                          className={`${
                            value.quantity === 0
                              ? "text-red-600 px-4 py-2 whitespace-nowrap "
                              : "px-4 py-2 text-base"
                          }`}
                        >
                          {value.name}
                        </td>
                        <td
                          className={`${
                            value.quantity === 0
                              ? "text-red-600 px-4 py-2 whitespace-nowrap "
                              : "px-4 py-2 text-base"
                          }`}
                        >
                          {value.department}
                        </td>
                        <td
                          className={`${
                            value.quantity === 0
                              ? "text-red-600 px-4 py-2 whitespace-nowrap "
                              : "px-4 py-2 text-base"
                          }`}
                        >
                          {value.quantity}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleEditClick(value);
                              setBook(value);
                              // setIsClicked(true);
                            }}
                            className={`${
                              value.quantity === 0
                                ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                                : "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                            }`}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
                  previousLabel={
                    <button
                      disabled={currentPage === 1}
                      className={`px-4 py-2 text-sm font-medium text-white ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-700"
                      } rounded`}
                    >
                      Prev
                    </button>
                  }
                  nextLabel={
                    <button
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 text-sm font-medium text-white ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-700"
                      } rounded`}
                    >
                      Next
                    </button>
                  }
                  breakLabel={
                    <span className="px-3 py-2 text-sm font-medium text-gray-500">
                      ...
                    </span>
                  }
                  pageCount={totalPages} // Total pages calculation
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={1}
                  onPageChange={handlePageClick} // Handle direct page clicks
                  containerClassName={"flex justify-center mt-6 space-x-2"}
                  pageClassName={
                    "px-4 py-2 text-sm font-medium border rounded hover:bg-blue-100 text-gray-700 bg-blue"
                  }
                  activeClassName={"bg-blue-500 text-white border-blue-500"}
                  disabledClassName={"opacity-50 cursor-not-allowed"}
                  forcePage={currentPage - 1} // Sync with ReactPaginate (0-indexed)
                />
              </div>
            ) : (
              <p className="text-center text-gray-600">No books available.</p>
            )}
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Book</h3>
                <Formik
                  initialValues={{
                    newBookName: selectedBook?.name || "",
                    newDepartment: selectedBook?.department || "",
                    newQuantity: selectedBook?.quantity || "",
                  }}
                  enableReinitialize
                  validationSchema={yup.object().shape({
                    newBookName: yup
                      .string()
                      .required("Book Name is required")
                      .max(30, "Book Name can have at most 30 characters"),
                    newDepartment: yup
                      .string()
                      .required("Department is required"),
                    newQuantity: yup
                      .number()
                      .typeError("Quantity must be a number")
                      .positive("Quantity must be greater than 0")
                      .integer("Quantity must be an integer")
                      .max(20, "Quantity must not exceed 20")
                      .required("Quantity is required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    updateBook(values);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <label className="block mb-2 text-sm">Book Name</label>
                      <InputFields
                        name="newBookName"
                        type="text"
                        className="w-full mb-4 p-2 border rounded"
                        value={values?.newBookName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={30}
                        disabled={isSubmitting}
                      />
                      {touched.newBookName && errors.newBookName && (  
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newBookName}
                          </p>
                        // {/* <ErrorMessage className="text-red-500 text-sm mt-1" name="newBookName"/> */}
                        )}

                      <label className="block mb-2 text-sm">Department</label>
                      <select
                        name="newDepartment"
                        className="w-full mb-4 p-2 border rounded"
                        value={values?.newDepartment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      >
                        <option value="">Select a Department</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                      </select>
                      {touched.newDepartment && errors.newDepartment && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newDepartment}
                        </p>
                      )}

                      <label className="block mb-2 text-sm">Quantity</label>
                      <InputFields
                        name="newQuantity"
                        type="number"
                        className="w-full mb-4 p-2 border rounded"
                        value={values?.newQuantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. 5"
                        min="0"
                        max="20"
                        disabled={isSubmitting}
                      />
                      {touched.newQuantity && errors.newQuantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newQuantity}
                        </p>
                      )}

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h2 className="text-xl font-bold text-center">Loading...</h2>
      )}
    </>
  );
};

export default BookList;
