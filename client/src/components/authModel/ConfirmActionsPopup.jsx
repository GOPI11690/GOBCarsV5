import React from "react"
import  "./ConfirmActionsPopup.css"
import ProgressBar from "../loading/ProgressBar"

export const ConfirmActionsPopup = ({
  btnName,
  message,
  onConfirm,
  onCancel
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  setTimeout(() => {
    setIsLoading(true);
  }, 5000);
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
        {isLoading?<ProgressBar/>:""}
         
      </div>
    </div>
  )
}
