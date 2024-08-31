import React from 'react';
import ReactDOM from 'react-dom';

function TransferModal({ isVisible, onClose, onSubmit }) {
  if (!isVisible) return null;

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Transfer Ownership</h2>
        <input type="text" />
        <div>
          <button onClick={handleSubmit} className="button primary">
            Confirm Transfer
          </button>
          <button onClick={onClose} className="button secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default TransferModal;
