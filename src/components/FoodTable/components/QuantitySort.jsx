import SortIcon from "./SortIcon";

const QuantitySort = ({ handleSort }) => {
  return (
    <div className="flex-div">
      <p>Cantidad</p>
      <button className="btn" onClick={handleSort}>
        <SortIcon />
      </button>
    </div>
  );
};

export default QuantitySort