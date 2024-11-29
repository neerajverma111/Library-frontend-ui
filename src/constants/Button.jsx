import { memo } from "react";

const Button = ({ type = "button", className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
