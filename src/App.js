import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Registerpage";
import Listing from "./components/Listing/Listing";
import Signup from './components/AuthComponents/Signup';
import { useHistory } from 'react-router-dom';
import Forgotpassword from './components/AuthComponents/Forgotpassword'
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ListScholarship from "./components/ListScholarship/ListScholarship";
import FundEducation from "./pages/FundEducation";
import StudentProfile from "./pages/StudentProfile";


const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Signin = lazy(() => import("./components/AuthComponents/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Registerpage = lazy(() => import("./pages/Registerpage"));
const SuccessPage = lazy(() => import("./components/SuccessPage/SuccessPage"));




function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/list-scholarship" element={<ListScholarship />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/fund-education" element={<FundEducation />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />


        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;


