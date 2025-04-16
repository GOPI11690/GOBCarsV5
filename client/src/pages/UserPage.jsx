import React,{useEffect,useState} from 'react'
import axios from 'axios';
import LandingPage from './LandingPage'
import BrowseCars from './BrowseCars'
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
function UserPage() {
    const [message, setMessage] = useState("");
    // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://localhost:5173/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return (
    <div>
        <LandingPage/>
        <BrowseCars/>
        {message}
    </div>
  )
}

export default UserPage