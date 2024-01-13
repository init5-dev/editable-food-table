const Name = ({ name, index, handleChange }) => {
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => handleChange("name", e.target.value, index)}
    />
  );
};

export default Name