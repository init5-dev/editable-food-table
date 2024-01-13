import AddIcon from "./AddIcon";

const AddItem = ({ handleClick }) => {
  return (
    <button className="btn add-btn" onClick={handleClick}>
      Nuevo alimento
      <AddIcon />
    </button>
  );
};

export default AddItem