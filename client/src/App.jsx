import "./App.css";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginSuccessful, logout } from "./redux/slices/userSlice"
import { useLayoutEffect } from "react";
import { ThemeProvider } from "./theme/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";
import Termofuse from "./pages/Termofuse";
import Privacypolicy from "./pages/Privacypolicy";
import Reviewpage from "./pages/Reviewpage";
import BrowseCars from "./pages/BrowseCars";
import Howitworks from "./pages/Howitworks";
import CheckInCheckOut from "./pages/CheckInCheckOut";
import UserDashboard from "./views/UserDashboard";
import UserReviews from "./views/UserReviews";
import UserBookings from "./views/UserBookings";
import DealerCars from "./views/DealerCars";
import HostPage from "./pages/hostpages/HostPage";
import AdminDashboard from "./components/adminModel/views/AdminDashboard";
import AdminReviews from "./components/adminModel/views/AdminReviews";
import AdminCars from "./components/adminModel/views/AdminCars";
import BookingPage from "./pages/BookingPage";
import CarTechnicalsPage from "./pages/CarTechnicalsPage";
import RentalSummary from "./pages/RentalSummary";
import AdminBookings from "./components/adminModel/views/AdminBookings";
import { CheckUserAuthenticated } from "./utils/ApiCalls";
import Spinner from "./components/loading/Spinner";
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function App() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const isUserAuthenticate=async ()=>{
    try{
    const response=await CheckUserAuthenticated();
    
    dispatch(loginSuccessful(response.data.user))
    setLoading(false);
  } catch (err) {
    dispatch(logout());
    setLoading(false);
    console.log("New User without token : ",err);
    
  }

  }
  

  useEffect(() => {
    isUserAuthenticate();
    
  }, [])
  
  return (
    <ThemeProvider>
       { isLoading? <div className="min-h-screen flex flex-row justify-center items-center"><Spinner /></div>: 
      <main className="min-h-screen bg-white dark:bg-gray-900">
     
        <Navigation />
        {/* <Router> */}
        <Wrapper>
          <Routes>
            {/* <Route path="/" exact element={<Layout />} /> */}
            {/* public routes */}
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<CheckInCheckOut />} />
              <Route path="cars" element={<BrowseCars />} />
              <Route path="home/cars" element={<BrowseCars />} />
              <Route path="howitworks" element={<Howitworks />} />
              <Route path="retrospects" element={<Reviewpage />} />

              <Route path="termofuse" element={<Termofuse />} />
              <Route path="privacypolicy" element={<Privacypolicy />} />
              <Route path="/" element={<Homepage />} />
              <Route path="home" element={<Homepage />} />
              <Route path="aboutus" element={<Aboutus />} />
              <Route path="hostpage" element={<HostPage />} />
              <Route path="hostpage/login" element={<CheckInCheckOut />} />
              <Route path="cartechnicals" element={<CarTechnicalsPage />} />
              <Route path="bookingpage" element={<BookingPage />} />
              <Route path="rentalsummary" element={<RentalSummary />} />

              <Route path="userpage" element={<UserPage />}>
                <Route path="userdashboard" element={<UserDashboard />} />
                <Route path="userbookings" element={<UserBookings />} />
                <Route path="dealercars" element={<DealerCars />} />
                <Route path="userreviews" Component={UserReviews} />
              </Route>
              <Route path="adminpage" element={<AdminPage />}>
                <Route path="admindashboard" element={<AdminDashboard />} />
                <Route path="adminbookings" element={<AdminBookings />} />
                <Route path="adminreviews" element={<AdminReviews />} />
                <Route path="admincars" element={<AdminCars />} />
              </Route>

              {/* catch all */}
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
              {/* <Route path='userpage/*' element={<Navigate to="/userpage" />}/>
 <Route path='adminpage/*' element={<Navigate to="/adminpage" />}/> */}
            </Route>
          </Routes>
        </Wrapper>
        <Footer />
      </main>}
    </ThemeProvider>
  );
}

export default App;
