import React, { useContext } from "react";
import { toast } from "react-toastify";
import { LoginUserContext } from "../context/LoginUser";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../constants/InputFields";
import Button from "../constants/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginUser = () => {
  const { loginUser, isAdmin } = useContext(LoginUserContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const result = await loginUser(values); // Pass values directly
    console.log(isAdmin);
    if (result.success === true) {
      if (isAdmin) {
        toast.success(result.message);
        navigate("/admin-dashboard");
      } else {
        toast.success(result.message);
        navigate("/user-dashboard");
      }
    } else {
      toast.error(result.message);
      navigate("/not-authorized");
    }
    setSubmitting(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Email is required!")
              .email("Enter a valid email address!"),
            password: Yup.string()
              .required("Password is required!")
              .min(8, "Password must be at least 8 characters"),
          })}
          onSubmit={handleFormSubmit}
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
              className="bg-white p-8 rounded-2xl box-border shadow-md w-96 opacity-90 hover:opacity-100 transition-opacity duration-300"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

              {/* Email Input */}
              <InputField
                label="Email"
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Email"
                onInput={(e) => {
                  e.target.value = e.target.value.toLowerCase();
                }}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}

              {/* Password Input */}
              <InputField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Password"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none`}
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>

              <div className="mt-2 text-center">
                <Link className="text-blue-700 font-medium" to="/Signup">
                  Register
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginUser;
