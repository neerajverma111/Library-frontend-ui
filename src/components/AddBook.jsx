import React, { useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl, jwtToken } from "../constants/Constant";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addBook = async (values) => {
    console.log(values);
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `http://${apiUrl}/users/admin/add-book`,
        {
          name: values.bookName,
          department: values.department,
          quantity: values.quantity,
        },
        jwtToken
      );
      if (response.status === 201) {
        toast.success("Book Added Successfully");
        navigate("/book-list");
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
          <Formik
            initialValues={{
              bookName: "",
              department: "",
              quantity: "",
            }}
            validationSchema={yup.object().shape({
              bookName: yup.string().required("Book Name is required"),
              department: yup.string().required("Department is required"),
              quantity: yup
                .number()
                .typeError("Quantity must be a number")
                .positive("Quantity must be greater than 0")
                .integer("Quantity must be an integer")
                .max(20, "Quantity must not exceed 20")
                .required("Quantity is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              addBook(values); // Pass the values to the API call
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
                <label
                  htmlFor="book-name"
                  className="block text-sm font-medium"
                >
                  Book Name:
                </label>
                <input
                  id="book-name"
                  name="bookName"
                  value={values.bookName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Harry Potter..."
                  className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  maxLength={30}
                />
                {touched.bookName && errors.bookName && (
                  <p className="text-red-500 text-sm mt-1">{errors.bookName}</p>
                )}

                <label htmlFor="quantity" className="block text-sm font-medium">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 5"
                  type="number"
                  className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                />
                {touched.quantity && errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                )}

                <label
                  htmlFor="department"
                  className="block text-sm font-medium"
                >
                  Department:
                </label>
                <select
                  id="department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full p-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Biography">Biography</option>
                </select>
                {touched.department && errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-gray-900 bg-gradient-to-r from-red-200 via-red-300 w-full to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Add Book
                </button>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default AddBook;
