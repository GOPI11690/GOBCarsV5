import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {searchStart} from "../redux/slices/searchSlice";
import { AddLicense, AddPayment, AddRental } from '../utils/ApiCalls';
import { useNavigate} from 'react-router-dom';
import { ConfirmActionsPopup } from "../components/authModel/ConfirmActionsPopup";
import moment from 'moment';
import { NotifyCompletePayment } from '../components/authModel/NotifyCompletePayment';
import ProgressBar from '../components/loading/ProgressBar';
import payComplete from '../assets/images/paymentCompleteAnime.gif';
moment().format();

const BookingPage = () => {
  const search = useSelector((state) => state.search.search);
  const user = useSelector((state) => state.user.user);
  const IndianFormatter = new Intl.NumberFormat("en-IN");
  const [calculateData,setCalculateData]=useState({advance:10000,cgstValue:0,sgstValue:0,taxableValue:0,totalValue:0});
  const dispatch = useDispatch();
   const [isPopupConfirmVisible, setIsPopupConfirmVisible] = useState(false);
   const [isPopupOkVisible, setIsPopupOkVisible] = useState(false);
    const [pay,setPay]=useState(false);
    const [rangeDate,setRangeDate]=useState({});
    const [licenseNumber,setLicenseNumber]=useState("");
    const [expiryDate,setExpiryDate]=useState("");
    const [termOne, setTermOne] = useState(false);
    const [termTwo, setTermTwo] = useState(false);
    const [diffDay,setDiffDay]=useState(0);
    const [cardnumber,setCardNumber]=useState("");
    const [expdate,setExpDate]=useState("");
    const [cvv,setCvv]=useState("");
    const [rentalid,setRentalId]=useState("");  
    const [messageSuccess, setMessageSuccess] = useState("");
      const [messageFailed, setMessageFailed] = useState("");
      const [isLoading, setIsLoading] = useState(false);
  const MIN_DATE = new Date();
  MIN_DATE.setDate(MIN_DATE.getDate() - 0);
  const navigate=useNavigate();
  
  const handleTermOne = (e) => {
    if (e.target.checked) {
      setTermOne(true);
      setMessageFailed("");
    } else {
      setTermOne(false);
    }
  };
  const handleTermTwo = (e) => {
    if (e.target.checked) {
      setTermTwo(true);
      setMessageFailed("");
    } else {
      setTermTwo(false);
    }
  };

  const handleCancel=(e)=>{
    e.preventDefault();
    setRangeDate({});
    setLicenseNumber("");
    setExpiryDate("");
    setTermOne(false);
    setTermTwo(false);
    navigate(-1)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!rangeDate&&!licenseNumber&&!expiryDate){
      setMessageFailed("Please Select Start and Return Date");
      return;
    }
    else if(!licenseNumber&&!expiryDate){
      setMessageFailed("Please Enter License Number and Expiry Date!");
      return;
    }
    else if(termOne!==true&&termTwo!==true){
      setMessageFailed("Please tick Terms and Conditions below");
      return;
    }
    else{
      setIsLoading(true);
      setTimeout(() => {
        setPay(true);
      setTermOne(false);
      setTermTwo(false);
      setIsLoading(false);
      }, 1500);
      
      
    }
  }

  const calculate=()=>{
    try{
      if(rangeDate.startDate!==undefined&&rangeDate.endDate!==undefined){
        const fromDate = moment.utc(rangeDate.startDate);
        const toDate = moment.utc(rangeDate.endDate);
        setDiffDay(toDate.diff(fromDate, 'days')+1);
        const taxableValue=search.carrent*diffDay;
        const gstValue=taxableValue*0.09;
        const totalValue=taxableValue+(gstValue*2)+calculateData.advance;
        setCalculateData({...calculateData,taxableValue:taxableValue,cgstValue:gstValue,sgstValue:gstValue,totalValue:totalValue});
    
      }
    }catch(e){
      throw new Error(e);
    }
   
}
const confirmMessage = 
  <p>
    Are you sure to Pay?
    <br />
    <span>
      (Rs: <strong>{calculateData.totalValue}</strong>)
    </span>
  </p>
;
const completeMessage = 
  <div className='flex flex-col items-center justify-center'>
    Your Payment : 
    
    <span>
      Rs: <strong>{calculateData.totalValue }</strong> successfully received!!!
    </span>
    <br />
    {/* <span className='scale-0 transition-scale ease-out duration-700'><img src='../src/assets/images/paymentProcess.gif'/></span> */}
    <span className='scale-50 transition-scale ease-in duration-700'><img src={payComplete}/></span>
  </div>
;
const handlePay = async () => {
  if(!cardnumber&&!expdate&&!cvv)
  {
    setMessageFailed("Enter all Details");
  }
  else{
    setIsLoading(true);
    setTimeout(() => {
      setIsPopupConfirmVisible(true);
      setIsLoading(false);
    }, 1000);
   
  }
  
};
const handleCancelPayNow=(e)=>{
  e.preventDefault();
  setPay(false)
 
}
const handleButtonCancel = () => {
  setIsPopupConfirmVisible(false);
};
const handleConfirm=async ()=>{
  setIsPopupConfirmVisible(false);
  
  setTimeout(() => {
    setIsPopupOkVisible(true)
    
  }, 100);
  
  try{
    await AddLicense(licenseNumber, expiryDate,user._id);
    setMessageSuccess("License Number added");
    const response=await AddRental(rangeDate.startDate,rangeDate.endDate,0,"pending",search.carid,user._id);
    setRentalId(response.data.rental._id);
    setMessageSuccess("Rental details added");
    
  }
  catch(e){throw new Error("error in booking page",e)}

}
const handleOk=async ()=>{
  try{
    await AddPayment(calculateData.totalValue,"Reserved",rentalid);
    dispatch(
      searchStart({
        model:null,
        seater:null,
        carid:search.carid,
        carimg:search.carimg,
        carrent:search.carrent,
        carname:search.carname, 
        cartype:search.cartype,
        rentalid:rentalid,
        totrentdays:diffDay,
        calculatedata:calculateData,
      }))
    setMessageSuccess("Payment details added");
  }
  catch(e){
    setMessageFailed("Error in Payment");
    throw new Error("Error in Payment",e);
    
  }
  setIsPopupOkVisible(false);
  navigate("/rentalsummary");
}
  useEffect(() => {
    if(search.pickupdate!==null&&search.returndate!==null) {
      let date={startDate:search.pickupdate,endDate:search.returndate};

      setRangeDate(date);
      calculate();
    }
  
   
    if(rangeDate.startDate!==undefined&&rangeDate.endDate!==undefined){
      calculate();
    }
    dispatch(searchStart({
                model:search.model,
                seater:search.seater,
                pickupdate:null,
                returndate:null,
                carid:search.carid,
            carimg:search.carimg,
            carrent:search.carrent,
            carname:search.carname,
            cartype:search.cartype,
              }))
  },[rangeDate,diffDay]);

  return (
    <div className="md:px-40 md:py-32 pt-28 flex flex-col items-center justify-center bg-white dark:bg-gray-900 dark:text-gray-100 ">
     {!pay?
     <div className='checkout'>
      <div className='flex flex-row px-5 justify-center'><h1 className='text-2xl font-extrabold'>Checkout</h1></div>
      <div className='md:grid md:grid-cols-[repeat(2,1fr)] md:grid-rows-[repeat(1,1fr)] gap-2'>
      <div className="leftside border-dashed border-gray-400 md:ml-40 flex flex-col gap-5 md:col-span-1 md:row-span-1">
      <div className='userdetails'>
      <div className='name px-10 py-1 '><label className='font-semibold text-2xl'>Name : </label><span className='font-medium text-xl'>{user.name.charAt(0).toUpperCase() +
              user.name.slice(1).toLowerCase()}</span></div>
      <div className='email px-10 py-1 '><label className='font-semibold text-2xl'>Email : </label><span className='font-medium text-xl'>{user.email}</span></div>
      <div className='contact px-10 py-1 '><label className='font-semibold text-2xl'>Mobile : </label><span className='font-medium text-xl'>{user.contact}</span></div>
      </div>
      <div className='date'>
      <div className="flex flex-col px-10 py-1">
        <label htmlFor="rangeid" className="block font-medium text-xl">Start Date to End Date</label>
            <Datepicker 
          minDate={MIN_DATE} useRange={true} inputId="rangeid" placeholder="DD-MM-YYYY - DD-MM-YYYY" popoverDirection="up"
            inputName="datepicker1" inputClassName=" rounded-md w-full min-h-10 text-xl focus:ring-0 p-1 placeholder:text-gray-400 text-black dark:placeholder:text-gray-600"
            value={rangeDate}  containerClassName="relative mt-2 flex flex-row border-2 border-solid border-slate-500 px-2 rounded-lg"
            onChange={(newValue)=>setRangeDate(newValue)}
        /> 
    </div>
   
      </div>
      <div className='license'>
      <div className="flex flex-col px-10 py-1 ">
            <label className='font-medium text-xl'>License Number</label>
              <input
              id="license"
              placeholder="e.g. TN01ABC12345"
              type="text"
              name="license"
              value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)}
              className=" py-3 px-2 placeholder-gray-500  rounded-md border-2 border-solid border-slate-500 text-black"
              required
            ></input></div>
            <div className="flex flex-col px-10 py-1 ">
            <label className='font-medium text-xl'>Expiry Date</label>
              <input
              id="expiry"
              placeholder="e.g. MM/YYYY"
              type="text"
              name="expiry"
              value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
              className=" py-3 px-2 placeholder-gray-500  rounded-md border-solid border-2 border-slate-500 text-black p-1"
              required
            ></input></div>{messageSuccess && (
              <span className="text-green-500">{messageSuccess}</span>
            )}
            {messageFailed && (
              <span className="text-red-500">{messageFailed}</span>
            )}
             
      </div>
      </div>
      
      <div className='rightlayout border-2 border-gray-600 md:border-dashed  flex flex-col p-5 px-10 md:mr-40 md:col-span-1 md:row-span-1 md:col-start-2'>
      <div><h3 className='text-xl font-semibold underline p-1'>Your Bill Details</h3></div>
      <div className='car details relative flex flex-row'>
        <div className='image px-10 py-3'>
          <img src={search.carimg} className='h-20'></img>
        </div>
        <div className='name flex flex-row items-center justify-center'>
          <h3>{search.carname}</h3>
        </div>
        <div className='absolute right-5 top-2'>
          <Link className='text-blue-700 underline' to="/cars">change car</Link>
        </div>
      </div>
      <div><h3 className='text-xl font-semibold underline p-1'>Bill Summary</h3></div>

      <table className='table-fixed'>
        <tbody>
          <tr>
            <td><h3 className='text-xl font-medium p-1'>Vehicle Rent per day ₹: </h3></td>
            <td className='font-bold'>{search.carrent}.00</td>
          </tr>
          <tr>
            <td><h3 className='text-xl font-medium p-1'>Total days for rent : </h3></td>
            <td className='font-bold'>{diffDay}</td>
          </tr>
          <tr>
          <td><h3 className='text-xl font-medium p-1'>Security Deposit ₹: </h3></td>
          <td className='font-bold'>{calculateData.advance}.00</td>
          </tr>
          <tr>
            <td className='border-2 border-dashed border-gray-500'></td>
            <td className='border-2 border-dashed border-gray-500'></td>
          </tr>
          <tr>
            <td><h3 className='text-xl font-medium p-1 pt-2'>Taxable Value ₹: </h3></td>
            <td className='font-bold'>{IndianFormatter.format(calculateData.taxableValue)}.00</td>
          </tr>
          <tr>
            <td><h3 className='text-xl font-medium p-1'>CGST (9%) ₹: </h3></td>
            <td className='font-bold'>{IndianFormatter.format(calculateData.cgstValue)}.00</td>
          </tr>
          <tr>
            <td><h3 className='text-xl font-medium p-1'>SGST (9%) ₹: </h3></td>
            <td className='font-bold'>{IndianFormatter.format(calculateData.sgstValue)}.00</td>
          </tr>
          <tr>
            <td className='border-2 border-dashed border-gray-500'></td>
            <td className='border-2 border-dashed border-gray-500'></td>
          </tr>
          <tr>
            <td><h3 className='text-xl font-medium pt-5 p-1'>Grand Total ₹: </h3></td>
            <td className='font-bold'>{IndianFormatter.format(calculateData.totalValue)}.00</td>
          </tr>
          
        </tbody>
      </table>

      
      </div>
      </div>
      
      <div className='terms flex flex-col items-center justify-center pt-5  dark:text-white '>
        <h1>Terms and Conditions</h1>
        <p className='md:w-3/4 px-10'>By signing this form, I confirm that the information provided is accurate. I agree to abide by the rental company's policies, including but not limited to the following:</p>
        <ul className='px-10 py-1'>
          <li className='flex gap-2'>         
              <input type="checkbox" className='w-4' name="termOne" value={termOne} onChange={handleTermOne} />            
            <div><p>I accept full responsibility for any damages incurred during the rental period.</p></div>
          </li>
          <li className='flex gap-2'>            
              <input type="checkbox" className='w-4' name="termTwo" value={termTwo} onChange={handleTermTwo} />            
            <div><p>I will return the vehicle on the agreed date and time to avoid additional charges.</p></div>
          </li>
        </ul> 
        <div className='py-5 flex flex-row gap-5'>
        <button className="w-full bg-red-500 py-1 text-xl rounded-md hover:bg-red-700 text-white mb-10"
              type="button" onClick={(e) => handleCancel(e)}>Cancel</button> 
        <button onClick={(e)=>handleSubmit(e)} className="w-full bg-green-500 py-1 text-xl rounded-md hover:bg-green-700 text-white mb-10"
              type="button">Proceed To Payment</button>
              
          </div> {isLoading?<ProgressBar/>:'' }  
        
      </div>
      
      </div>
      : 
      <div className='flex flex-col justify-center items-center bg-slate-200 dark:text-black rounded-xl'>
        
        <form>
        <div className='payment flex flex-col gap-4 justify-center items-center'>
          <div className='heading flex flex-row items-center justify-center '>
            <h3 className='text-3xl font-extrabold p-10'>Payment</h3>
          </div>
          <div>
            <h2 className='text-2xl font-bold p-10 text-center'>Payment Total Rs. {calculateData.totalValue}</h2>
          </div>
          <div className='flex flex-col p-10 gap-4'>
            <h2 className='px-2'>Please Enter Card Details</h2>
          <div className="flex flex-col  p-4 bg-slate-100 rounded-xl">
            <label className='font-semibold'>Card Holder Name</label>
              <input
              id="holdername"
              placeholder="e.g. Will Smith"
              type="text"
              name="holdername"
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required
            ></input>
          </div>
          <div className="flex md:flex-row flex-col  gap-2 ">
          <div className="flex flex-col p-2 sm:w-[60%] bg-slate-100 rounded-xl ">
            <label className='font-semibold'>Card Number</label>
              <input
              id="cardnumber"
              placeholder="e.g. 1234 4567 7890"
              type="text"
              value={cardnumber}
              name="cardnumber" onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,12}$/.test(value)) {setCardNumber(value)}
                }
              }
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required 
            ></input>
            {cardnumber.length > 0 && cardnumber.length !== 12 && (
    <span className="text-red-500">Card number must be exactly 12 digits.</span>
  )}</div>
            <div className='flex flex-row sm:w-[40%] gap-2'>
            <div className="flex flex-col p-2  sm:w-[60%] bg-slate-100 rounded-xl">
            <label className='font-semibold'>Exp-date</label>
             <input
              id="expdate"
              placeholder="e.g. MM/YY"
              type="text"
              name="expdate" value={expdate}
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required onChange={(e) => {
                const value = e.target.value;
                // if (/^(0[1-9]|1[0-2])\/\d{0,2}$/.test(value)) { // Validate MM/YY format
                  setExpDate(value);
                
              }}
            ></input>{expdate.length > 0 && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expdate) && (
              <span className="text-red-500">Expiry date must be in MM/YY format.</span>
            )}
            </div>
            <div className="flex flex-col sm:w-[37%] p-2 bg-slate-100 rounded-xl">
            <label className='font-semibold'>CVV</label>
             <input
              id="cvv"
              placeholder="e.g. ###"
              type="text"
              name="cvv"
              value={cvv}
              maxLength={4}
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) { // Allow only up to 4 digits
                  setCvv(value);
                }
              }}
            ></input>{cvv.length > 0 && (cvv.length < 3 || cvv.length > 4) && (
              <span className="text-red-500">CVV must be 3 or 4 digits.</span>
            )}</div>
            </div>
           
          </div>
          <div className="flex md:flex-row flex-col  gap-2 ">
          <button
              className="w-full bg-gray-500 py-2 text-xl rounded-md hover:bg-gray-700 text-white mb-10"
              onClick={(e)=>handleCancelPayNow(e)}
            >
              Cancel
            </button>
            <button type='button'
              className="w-full bg-green-500 py-2 text-xl rounded-md hover:bg-green-700 text-white mb-10"
              onClick={(e) => handlePay(e)}
            >
              Pay now
            </button>
            </div>
            {isLoading?<ProgressBar/>:''}
          </div>
          
        </div>
        </form>{isPopupConfirmVisible && (
                  <ConfirmActionsPopup
                    btnName={"Confirm"}
                    message={confirmMessage}
                    onConfirm={handleConfirm}
                    onCancel={() => handleButtonCancel()}
                  />
                )}{isPopupOkVisible && (
                  <NotifyCompletePayment
                    btnName={"Ok"}
                    message={completeMessage}
                    onConfirm={handleOk}
                  />
                )}

        </div>}
    </div>
    
  )
}

export default BookingPage