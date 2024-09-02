import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ValidationError } from "./Errors";
import { addressValidationSchema } from "../../utils/validation/validation-schema";
import { GlobalContext } from "../../context/GobalContext";

function TransferModal({ isVisible, onClose, onSubmit, vestID }) {
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState("");
  const {accountID} = useContext(GlobalContext)

  console.log(vestID);

  useEffect(() => {
    if (isVisible) {
      setNewAddress("");
      setError("");
    }
  }, [isVisible, accountID]);

  if(!accountID) return null
  if (!isVisible) return null;

  const handleSubmit = async () => {
    try {
      await addressValidationSchema.validate({ newAddress });
      onSubmit(vestID, newAddress);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Transfer Ownership</h2>
        <input
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter new address"
          className="w-75"
          type="text"
        />
        <div className="w-75 mt-1">{error && <ValidationError err={error} />}</div>
        <div className=" d-flex flex-row w-75">
          <button onClick={handleSubmit} className="button primary m-2">
            Confirm
          </button>
          <button onClick={onClose} className="button secondary m-2">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default TransferModal;
