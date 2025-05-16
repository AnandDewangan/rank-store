import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllBooks from './pages/AllBooks';
import BookDetail from "./pages/BookDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";

import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
      <Footer />
      <FooterBottom />
    </Router>
  );
}

export default App;
