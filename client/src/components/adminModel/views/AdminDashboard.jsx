import React,{useState} from 'react'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { ConfirmAddPopup } from "../../../components/authModel/ConfirmAddPopup";


function AdminDashboard() {
     const user = useSelector((state) => state.user.user);
     const [messageSuccess, setMessageSuccess] = useState("");
       const [messageFailed, setMessageFailed] = useState("");
      const [isPopupVisible, setIsPopupVisible] = useState(false);
      
    const handleAdd = async () => {
        setIsPopupVisible(true);
      };
    const handleConfirmAdd = async (carDetail) => {
        
        try {
            const configuration = {
                method: "post",
                url: "http://localhost:3030/api/car/add",
                data: {
                  name:carDetail.model,
                  brand:carDetail.brand,
                  type:carDetail.type,
                  fuel:carDetail.fuel,
                  capacity: carDetail.capacity,
                  gear:carDetail.gear,
                  rateperday:parseInt(carDetail.rateperday),
                  thumbnail: carDetail.thumbnail,
                  status:carDetail.status,
                  userid:carDetail.userid,
                },withCredentials:true
              };setIsPopupVisible(false);
               // make the API call
               console.log(configuration)
                   await axios(configuration)
                      .then(() => {
                        setMessageSuccess("Your Car Details registered sucessfully");
                        setTimeout(() => setMessageSuccess(""), 3000);})
                    
        } catch (error) {
          setMessageFailed("Something Wrong");
            setTimeout(()=>setMessageFailed(""),3000);
            throw new Error(error);
        }
      };
      const handleButtonCancel = () => {
        setIsPopupVisible(false);
      }
    
   
    const isUserAuthenticated = useSelector(
      state => state.user.isUserAuthenticated
    )
  
    if (!isUserAuthenticated) {
      return <Navigate to="/" />
    }
  
  return (
    <div className=' flex flex-row gap-5 dark:text-white p-5'>
        <div className='shadow-lg flex flex-row rounded-2xl w-96 dark:text-white p-5'>
    <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 bg-[#043774]">
            <h3 className="text-lg leading-6 font-medium text-white">
                Admin Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-white">
                This is some information about the Admin.
            </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.name.charAt(0).toUpperCase() +
                  user.name.slice(1).toLowerCase()}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.email}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.contact}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Joined On
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(user.createdAt).toLocaleString()}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Last Login On
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    You last logged in on:{" "}
                    {user && new Date(user.lastLogin).toLocaleString()}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
         </div>
         <div className='shadow-lg flex flex-row rounded-2xl h-80 w-52 dark:text-white p-5'>
    <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 bg-[#043774]">
            <h3 className="text-lg leading-6 font-medium text-white">
                Add Cars
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-white">
                You want to add your own Car, click Add Cars button below..
            </p>
        </div>
        <div className="border-t border-gray-200 px-4 h-2/4 py-5 sm:p-0 flex justify-center items-center">
        <div className="flex flex-row gap-5"><div className="rounded-[50px] border-2 border-solid hover:border-sky-600 border-black p-3">
            <button onClick={() => handleAdd()}
            className="flex text-center cursor-pointer items-center mx-4 hover:scale-125 text-black hover:text-sky-600"
            type="submit" >
            <FaPlusCircle  />
            <span className="text-sm font-medium px-2">Add Car</span>
          </button>
          </div>
          {isPopupVisible && (
                   <ConfirmAddPopup
                     onConfirm={handleConfirmAdd}
                     onCancel={() => handleButtonCancel()}
                   />
                 )}
                 
        </div>
    </div>
         </div>
         <div className='absolute bottom-10 right-40'>{messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}</div>
    </div>
    
    </div>
  )
}

export default AdminDashboard