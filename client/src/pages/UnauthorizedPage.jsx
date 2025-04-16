import React from 'react'
import SigninSignup from './SigninSignup'

function UnauthorizedPage() {
  return (
    <div className="py-24 bg-slate-100 min-h-screen dark:bg-gray-900">
      <div className="w-full flex justify-center items-center flex-col drop-shadow-2xl">
        
            <h1 className='dark:text-white font-bold text-xl'>You are Unauthorized to access this page. Please Login</h1>
         
          <SigninSignup/>
          </div>
          </div>
  )
}

export default UnauthorizedPage