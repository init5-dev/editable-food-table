const TypeFilter = ({ handleChange }) => {
  return (
    <div className="flex-div">
      <p>Tipo</p>
      <select className="filter-btn" onChange={handleChange}>
        <option value="">No filtrar</option>
        <option value="Comida">Comida</option>
        <option value="Bebida">Bebida</option>
      </select>
    </div>
  );
};

export default TypeFilter