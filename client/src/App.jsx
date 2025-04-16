import "./App.css";
import { useLayoutEffect } from "react";
import { ThemeProvider } from "./theme/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import SigninSignup from "./pages/SigninSignup";
// import Homepage from "./pages/Homepage";
// import RequireAuth from './components/RequireAuth';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";


import LinkPage from "./components/LinkPage";
import Layout from "./components/Layout";
import SigninSignup from "./pages/SigninSignup";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";
import Termofuse from "./pages/Termofuse";
import Privacypolicy from "./pages/Privacypolicy"
import Reviewpage from "./pages/Reviewpage";
import BrowseCars from "./pages/BrowseCars";
import Howitworks from "./pages/Howitworks";
const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Dealer': 'Dealer'
}
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function App() {

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        {/* <Router> */}
          <Wrapper>
            <Routes>
          {/* <Route path="/" exact element={<Layout />} /> */}
                {/* public routes */}
        <Route path="login" element={<SigninSignup />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="cars" element={<BrowseCars />} />
        <Route path="howitworks" element={<Howitworks />} />
        <Route path="retrospects" element={<Reviewpage />} />
        
        <Route path="termofuse" element={<Termofuse />} />
        <Route path="privacypolicy" element={<Privacypolicy />} />
        <Route path='/' element={<Homepage />}/>
        <Route path="aboutus" element={<Aboutus />}/>
        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<AdminPage />} />
        </Route> */}
 {/* catch all */}
 <Route path="*" element={<Navigate to="/" />} />

      </Routes>


            {/* <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/login" element={<SigninSignup />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
               protect routes 
              <Route
                path="/admin"
                element={
                  <ProtectedRoutes roles={"admin"}>
                    <AdminPage />
                  </ProtectedRoutes>
                }
              ></Route>

              <Route
                path="/user"
                element={
                  <ProtectedRoutes roles={"user"}>
                    <UserPage />
                  </ProtectedRoutes>
                }
              ></Route>

              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes> */}
          </Wrapper>
        {/* </Router> */}
        <Footer />

       
      </main>
    </ThemeProvider>
  );
}

export default App;
