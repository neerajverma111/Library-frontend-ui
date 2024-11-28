const InputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  onInput
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onInput={onInput}
        required
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
