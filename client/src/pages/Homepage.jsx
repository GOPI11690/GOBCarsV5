import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from './LandingPage';

import BrowseCars from './BrowseCars';
import Whychooseus from './Whychooseus';
import Howitworks from './howitworks';
import Reviewpage from './Reviewpage';
function Homepage() {
const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:5173/",
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
      <Howitworks />
            <BrowseCars/>
            <Whychooseus/>
            <Reviewpage/>
            {message}
    </div>
  )
}

export default Homepage