import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllBooks from './pages/AllBooks';
import BookDetail from "./pages/BookDetail";
import CartPage from "./pages/CartPage";
import TermConditions from "./pages/TermConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";
import { ToastContainer } from 'react-toastify';

import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    if (window.location.hostname.endsWith("vercel.app")) {
      window.location.href = "https://rankpublishinghouse.store";
    }
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/term-conditions" element={<TermConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
      <FooterBottom />
    </Router>
  );
}

export default App;
