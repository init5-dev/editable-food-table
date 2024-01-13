const Quantity = ({ quantity, index, handleChange }) => {
  const handleKeyUp = (e) => {
    if (e.key === "." || e.target.value.startsWith("0")) {
      const value = e.target.value;
      e.target.value = "";
      e.target.value = Math.floor(Number(value));
    }
  };

  return (
    <input
      type="number"
      value={quantity}
      pattern="/^\d+$/"
      onKeyUp={handleKeyUp}
      onChange={(e) => handleChange("quantity", e.target.value, index)}
    />
  );
};

export default Quantity