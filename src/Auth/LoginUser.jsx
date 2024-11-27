import React, { useContext } from "react";
import { toast } from "react-toastify";
import { LoginUserContext } from "../context/LoginUser";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../constants/InputFields";
import Button from "../constants/Button";
const LoginUser = () => {
  const { userDetails, setUserDetails, loginUser } =
    useContext(LoginUserContext);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser();
    if (result.success === true) {
      toast.success(result.message);
      if (result.isAdmin) { 
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      toast.error(result.message);
      navigate("/not-authorized");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb]">
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          className="bg-white p-8 rounded-2xl box-border shadow-md w-96 opacity-90 hover:opacity-100 transition-opacity duration-300"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>

          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="Enter your Email"
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            placeholder="Enter your Password"
          />
          <Button type="submit" onClick={handleSubmit}>
            Log In
          </Button>
          <div className="mt-2 text-center">
            <Link className="text-blue-700 font-medium" to="/Signup">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
