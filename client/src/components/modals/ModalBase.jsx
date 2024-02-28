import React from "react";
import "./modal-base.css";

const ModalBase = ({ onClose, children }) => {

  // don't bubble modal content clicks to modal base
  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event 
   */
  const handleModalContentClick = (event) => {
    event.stopPropagation()
  }


  return (
    <div className="modal-base" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>{children}</div>
    </div>
  );
};

export default ModalBase;
