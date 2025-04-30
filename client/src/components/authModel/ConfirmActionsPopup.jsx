import React from "react"
import  "./ConfirmActionsPopup.css"

export const ConfirmActionsPopup = ({
  btnName,
  message,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="wrappers">
      <div className="popups">
        {message}
        <div className="buttonWrapper">
          <button className="cancelButton" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirmDeleteButton" onClick={onConfirm}>
            {btnName}
          </button>
        </div>
         
      </div>
    </div>
  )
}
