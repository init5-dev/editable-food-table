const ConfirmDeletion = ({ onClose, onConfirm }) => {
  return (
    <div className="popup">
      <p>¿Estás seguro de que deseas eliminar el alimento del stock?</p>
      <button className="btn" onClick={onConfirm}>
        Sí
      </button>
      <button className="btn" onClick={onClose}>
        No
      </button>
    </div>
  );
};

export default ConfirmDeletion