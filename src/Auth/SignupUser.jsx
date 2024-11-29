import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants/Constant";
import InputField from "../constants/InputFields";
import { Formik } from "formik";
import * as yup from "yup";
// import "../index.css"
const Signup = () => {
  const navigate = useNavigate();
  const signUp = async (values) => {
    try {
      const response = await axios.post(`http://${apiUrl}/users/signUp`, {
        name: values.userName,
        email: values.userEmail,
        password: values.password,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "Signup successful!");
        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Formik
          initialValues={{
            userName: "",
            userEmail: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            userName: yup
              .string()
              .required("Username is required!")
              .matches(
                /^[a-zA-Z][a-zA-Z_-]{2,19}$/,  
                "Enter a valid username (3-20 characters, letters, underscores, or hyphens)"
              ),
            userEmail: yup
              .string()
              .required("Email is required!")
              .trim()
              .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // From emailRegex
                "Enter a valid email address!"
              ),
            password: yup
              .string()
              .required("Password is required!")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, // From passRegex
                "Password must be like 'User@123'."
              ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            signUp(values);
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
            <form
              className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-90 hover:opacity-100 transition-opacity duration-300"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
              <InputField
                label="Username"
                type="text"
                id="userName"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your username"
              />
              {touched.userName && errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}

              <InputField
                label="Email"
                type="email"
                id="userEmail"
                name="userEmail"
                value={values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
              />
              {touched.userEmail && errors.userEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
              )}

              <InputField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
