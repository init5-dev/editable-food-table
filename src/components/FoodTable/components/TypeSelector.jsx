const TypeSelector = ({ value, index, handleChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => handleChange("type", e.target.value, index)}
    >
      <option value="Comida">Comida</option>
      <option value="Bebida">Bebida</option>
    </select>
  );
};

export default TypeSelector