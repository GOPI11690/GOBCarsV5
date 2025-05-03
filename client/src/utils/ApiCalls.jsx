import axios from "axios";

export const GetReviews = async (userid) => {
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
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching reviews: " + err.message);
      }
  };
  export const AddReview=async(review,rating,reviewername,userid) => {
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
  export const AddUser=async(username,contact,email,password,roles,userstatus,isVerified) => {
    const response=await axios.post('http://localhost:3030/api/review/add',
      {
        username,
        contact,
        email,
        password,
        roles,
        userstatus,
        isVerified,
      },
      {
        withCredentials: true
      } 
    )
      return response
    
  }
  export const DeleteReview=async(reviewid) => {
    const response=await axios.delete('http://localhost:3030/api/review/delete/'+reviewid,
      
      {
        withCredentials: true
      } 
    )
      return response
  }
  export const GetAllUsers = async () => {
    try {
        let url = "http://localhost:3030/api/user/all";
        
        const response = await axios.get(
          url,
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching users: " + err.message);
      }
  }
  export const GetUser = async (userid) => {
    try {
      let url = "http://localhost:3030/api/user/checkauth";
      if(userid){
        url= "http://localhost:3030/api/user/"+userid;
      }
        
     
        const response = await axios.get(
          url,
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching user getuser: " + err.message);
      }
  };
  export const UserLogout = async () => {
    const response = await axios.post(
      "http://localhost:3030/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
  
    return response;
  };
  export const GetCar = async (carid) => {
    try {
        let url = "http://localhost:3030/api/car/"+carid;
     
        const response = await axios.get(
          url,
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching car getcar: " + err);
      }
  };
  export const GetAllCars = async () => {
    try {
        let url = "http://localhost:3030/api/car/all";
     
        const response = await axios.get(
          url,
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching car getallcars: " + err);
      }
  };
  export const GetDealerCars = async (userid) => {
    try {
      const url = "http://localhost:3030/api/car/dealer/"+userid;
      const response = await axios.get(
        url,
        {
          withCredentials: true,
        }
      );

      return response;
    } catch (err) {
      throw new Error("Error fetching cars: " + err.message);
    }
  };
  export const DeleteCar=async(carid) => {
    try{
      const response=await axios.delete('http://localhost:3030/api/car/delete/'+carid,
      
        {
          withCredentials: true
        } 
      )
        return response
    }catch(err){
      throw new Error("Error deleting cars: " + err);
    }
    
  }
  export const AddCar=async(name,brand,type,fuel,capacity,gear,rateperday,thumbnail,status,userid) => {
    const response=await axios.post('http://localhost:3030/api/car/add',
      {
        name,
        brand,
        type,
        fuel,
        capacity,
        gear,
        rateperday,
        thumbnail,
        status,
        userid
      },
      {
        withCredentials: true
      } 
    )
      return response
  }
  export const UserLogin = async (email, password) => {
     
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
    export const AddLicense=async(licenseNumber,expiryDate,userid) => {
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
    export const AddRental=async(startdate,returndate,amount,rentalstatus,carid,userid) => {
      
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
    export const AddPayment=async(amount,rentalstatus,rentalid)=>{
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
    export const GetRentals=async(rentalid)=>{
      const response=await axios.get('http://localhost:3030/api/rental/user/'+rentalid,

        {
          withCredentials: true
        } 
      )
        return response;
    }
    export const GetRental=async(rentalid)=>{
      const response=await axios.get('http://localhost:3030/api/rental/'+rentalid,
     
        {
          withCredentials: true
        } 
      )
        return response;
    }
    export const GetBookings=async(userid)=>{
      try {
        let url = "http://localhost:3030/api/rental/user/";
        if(userid=="admin"){
          url = url+"all";
        }
        else{
        url = url + userid;
        }
     
        const response = await axios.get(
          url,
          {
            withCredentials: true,
          }
        );
  
        return response;
      } catch (err) {
        throw new Error("Error fetching bookings getbookings: " + err);
      }
    }
    export const CheckUserAuthenticated = async () => {
 
          await new Promise(resolve => setTimeout(resolve, 2000))
          const response = await axios.get('http://localhost:3030/api/user/checkauth', {
            withCredentials: true
          })
    
          return response;
       
      }
    