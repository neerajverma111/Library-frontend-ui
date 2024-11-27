const Button = ({ type = "button", className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
