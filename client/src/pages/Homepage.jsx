import React from "react";
import LandingPage from './LandingPage';

import BrowseCars from './BrowseCars';
import Whychooseus from './Whychooseus';
import Howitworks from './Howitworks';
import Reviewpage from './Reviewpage';
function Homepage() {



  return (
    <div>
      <div>
      <LandingPage/>
      <Howitworks />
            <BrowseCars/>
            <Whychooseus/>
            <Reviewpage/>
           
      </div>
      
    </div>
  )
}

export default Homepage