import React from "react"
import  "./NotifyCompletePayment.css"

export const NotifyCompletePayment = ({
  btnName,
  message,
  onConfirm
}) => {
  return (
    <div className="wrappers scale-150 transition-scale ease-in duration-5000">
      <div className="popups">
        {message}
        <div className="buttonWrapper">
          
          <button className="okBtn" onClick={onConfirm}>
            {btnName}
          </button>
        </div>
         
      </div>
    </div>
  )
}
