const Name = ({ name, index, handleChange }) => {
  return (
    <input
      type="text"
      value={name}
      placeholder={name ? "" : "Nombre del alimento..."}
      onChange={(e) => handleChange("name", e.target.value, index)}
    />
  );
};

export default Name