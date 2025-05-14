import React from "react";

function RefundPolicy() {
  return (
    <div className="md:px-40 md:py-40 p-20 bg-white min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div className="border-solid shadow-xl">
        <h1 className="border-l-8 text-xl border-solid txt-color font-extrabold dark:text-sky-500 border-sky-950 p-3">
          REFUND POLICY
        </h1>
        <div className="text-justify text-lg px-16 py-10">
          <div className="tracking-wider ">
            <p className="text-xl font-bold txt-color">
            Cancellation & Refund Policies:
            </p>
            <div className="tracking-wider text-lg/10 py-5">
              <ol className="list-decimal list-inside">
                <li>
                <span className="font-bold">Before 48 Hrs: </span>Minimum Rs. 600 or 20% of the booking Amount, whichever is higher.
                </li>
                <li>
                <span className="font-bold">Before 24 Hrs: </span>Minimum Rs. 1200 or 25% of the booking Amount, whichever is higher.
                </li>
                <li>
                <span className="font-bold">Within 24 Hrs: </span>One day rental or 30% of the booking Amount, whichever is higher.
                </li>
                <li>
                Booking canceled "ON" or "After" the pick up time or coming to claim the vehicle after 2 hrs of the pick up time shall be considered as "No Show" and the entire booking amount shall be forfeited by the company and the vehicle will not be provided and a fresh booking shall be needed to make by the customer.
              
                </li>
                <li>
                The refund will be made by online transfer to the customer's bank account. No cash refund request.
                </li>
                <li>
                The amount will be refunded approximately within 7 business days. 
                </li>
              </ol>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
