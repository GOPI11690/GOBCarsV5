import axios from "axios";

export const getReviews = async (userid) => {
    try {
        let url = "http://localhost:3030/api/review/";
        if(userid=="admin"){
          url = url+"all";
        }
        else{
        url = url + userid;
        }
     
        const response = await axios.get(
          url,
          {},
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        console.log(err);
      }
  };
  export const addReview=async(review,rating,reviewername,userid) => {
    const response=await axios.post('http://localhost:3030/api/review/add',
      {
        review,
        rating,
        reviewername,
        userid
      },
      {
        withCredentials: true
      } 
    )
      return response
    
  }
  export const deleteReview=async(reviewid) => {
    const response=await axios.delete('http://localhost:3030/api/review/delete/'+reviewid,
      {},
      {
        withCredentials: true
      } 
    )
      return response
  }
  export const getAllUsers = async () => {
    try {
        let url = "http://localhost:3030/api/user/all";
        
        console.log(url)
        const response = await axios.get(
          url,
          {},
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        console.log(err);
      }
  }
  export const getCar = async (carid) => {
    try {
        let url = "http://localhost:3030/api/car/"+carid;
     
        const response = await axios.get(
          url,
          {},
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        console.log(err);
      }
  };
  export const userLogin = async (email, password) => {
     
        const response = await axios.post(`http://localhost:3030/api/user/login`,
          {
            email,
            password
          },
          {
            withCredentials: true
          } 
        )
    
        return response
      
    }
    export const addLicense=async(licenseNumber,expiryDate,userid) => {
      const response=await axios.post('http://localhost:3030/api/user/license',
        {
          licenseNumber,
          expiryDate,
          userid
        },
        {
          withCredentials: true
        } 
      )
        return response
      
    }
    export const addRental=async(startdate,returndate,amount,rentalstatus,carid,userid) => {
      console.log(startdate,returndate,amount,rentalstatus,carid,userid);
      const response=await axios.post('http://localhost:3030/api/rental/add',
        {
          startdate,
          returndate,
          amount,
          rentalstatus,
          carid,
          userid
        },
        {
          withCredentials: true
        }
       );
        return response;
    }
    export const addPayment=async(amount,rentalstatus,rentalid)=>{
      const response=await axios.put('http://localhost:3030/api/rental/payment/'+rentalid,
        {
          amount,
          rentalstatus
        },
        {
          withCredentials: true
        } 
      )
        return response;
    }
    export const getRental=async(rentalid)=>{
      const response=await axios.get('http://localhost:3030/api/rental/'+rentalid,
        {},
        {
          withCredentials: true
        } 
      )
        return response;
    }
    export const getBookings=async(userid)=>{
      try {
        let url = "http://localhost:3030/api/rental/";
        if(userid=="admin"){
          url = url+"all";
        }
        else{
        url = url + userid;
        }
     
        const response = await axios.get(
          url,
          {},
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        console.log(err);
      }
    }
    