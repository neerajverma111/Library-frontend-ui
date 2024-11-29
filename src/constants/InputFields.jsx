import { memo } from "react";

const InputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  onInput,
  onBlur,
  className,
  maxLength,
  disabled
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        className={`${className ? className : "w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" }`}
        value={value}
        maxLength={maxLength || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled ={disabled || false}
        onInput={onInput}
        onBlur={onBlur}
        required
      />
    </div>
  );
};

export default memo(InputField);
