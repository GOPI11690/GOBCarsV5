import React,{useState} from 'react'
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

function SignUp({className}) {
  const navigate=useNavigate();
  const [username, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("")
  const [messageFailed, setMessageFailed] = useState("")
  const resetForm = () => {
    setUserName("")
    setEmail("")
    setPassword("")
    setContact("")
  }

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (!username||!contact || !email || !password) {
      return
    }

    const configuration = {
      method: "post",
      url: "http://localhost:3030/api/user/add",
      data: {
        username,
        contact,
        email,
        password,
        role:"user",
        userstatus:"Available",
      },
    };
     // make the API call
    axios(configuration)
    .then(() => {
      setMessageSuccess("Your Details registered sucessfully")
      setTimeout(() => setMessageSuccess(""), 3000)
      resetForm()
      navigate("/login");
    })
    .catch((error) => {
      setTimeout(() => setMessageFailed(""), 3000)
      setMessageFailed("Something Wrong")
      throw new Error(error);
      
    });
  }

  
  return (
    <div className={className}>
        <div className=' bg-slate-100 min-h-screen dark:bg-gray-900'> 
        <div className='flex flex-col h-screen justify-center items-center'> 
                <form className="flex flex-col gap-5 "onSubmit={(e)=>handleSubmit(e)}>
                <label className='dark:text-white'>Name</label> 
                    <input placeholder='Your Name' name="username" value={username} className='
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden' onChange={(e) => setUserName(e.target.value)}></input>
                    <label className='dark:text-white'>Mobile</label> 
                    <input placeholder='Mobile Number' name="contact" value={contact} className='
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden 'onChange={(e) => setContact(e.target.value)}></input>
                    <label className='dark:text-white'>Email</label> 
                    <input placeholder='example@mail.com' type="email" name="email" value={email} className='
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden 'onChange={(e) => setEmail(e.target.value)}></input>
                    <label className='dark:text-white'>Password</label> 
                    <input placeholder='password' type="password" name="password" value={password} className='
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden'onChange={(e) => setPassword(e.target.value)}></input>
                    {/* <label className='dark:text-white'>Confirm Password</label> 
                    <input placeholder='password' type="password" name="confirmpassword"  className='
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden'></input> */}
                    <button className='w-full bg-sky-500 py-2 rounded-md text-lg text-white mb-10' type='submit' disabled={!username ||!contact|| !email || !password} onClick={(e) => handleSubmit(e)}>
                        Sign Up
                    </button>
                </form>
                {messageSuccess && (
            <span className='text-green-500'>{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className='text-red-500'>{messageFailed}</span>
          )}
            </div>
            
            
            
                 
            
        </div>
    </div>

    
  )
}

export default SignUp