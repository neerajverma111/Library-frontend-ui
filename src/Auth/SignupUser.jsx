import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants/Constant";
import InputField from "../constants/InputFields";
// import "../index.css"
const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z][a-zA-Z_-]{2,19}$/;

  const validationUser = () => {
    if (!userName && !userEmail && !password) {
      toast.error("Can not empty input field !!");
      return;
    } else if (!userName) {
      toast.error("Username is required!");
      return;
    } else if (!nameRegex.test(userName)) {
      toast.error("Enter Valid User-Name");
      return;
    } else if (!userEmail) {
      toast.error("Email is required!");
      return;
    } else if (!emailRegex.test(userEmail.trim())) {
      toast.error("Enter a valid email address!");
      return;
    } else if (!password) {
      toast.error("Password is required!");
      return;
    } else if (!passRegex.test(password)) {
      toast.error("Please Input Valid And Strong Password !!");
    } else {
      console.log("unknown error occoured");
    }
  };
  // console.log( typeof password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    validationUser();

    try {
      const response = await axios.post(`http://${apiUrl}/users/signUp`, {
        name: userName,
        email: userEmail,
        password: password,
      });
      console.log(password === passRegex.test(password));
      if (response) {
        console.log(response.data.message);
        console.log("success");
        toast.success(response.data.message || "Signup successful!");
        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Signup failed");
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-90 hover:opacity-100 transition-opacity duration-300"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">User Signup</h2>

          <InputField
            label="Username"
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
          />

          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <input
            type="submit"
            value="Sign Up"
            className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
          />
          <div className="mt-2 text-center">
            <Link className="text-blue-700 font-medium" to="/">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
