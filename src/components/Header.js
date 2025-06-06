import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaUser,
  FaClipboard,
  FaLinkedin,
} from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div id="header-wrap">
      {/* Top Content (only show if NOT logged in) */}
      {!user && (
        <div className="top-content bg-dark">
          <Container>
            <div className="d-flex justify-content-between py-2">
              <div className="d-flex gap-3 text-secondary">
                <a href="https://www.instagram.com/rankpublishing_house" target="_blank" rel="noreferrer" className="text-danger"><FaInstagram /></a>
                <a href="https://www.facebook.com/share/1Bu6mqhMwx" target="_blank" rel="noreferrer" className="text-primary"><FaFacebookF /></a>
                <a href="https://www.youtube.com/@Rankpublishinghouse" target="_blank" rel="noreferrer" className="text-danger"><FaYoutube /></a>
                <a href="https://www.linkedin.com/in/rank-publishing-house-9a9735354" target="_blank" rel="noreferrer" className="text-primary"><FaLinkedin /></a>
              </div>
              <div className="d-flex align-items-center gap-4">
                <a href="/register" className="d-flex align-items-center gap-1 text-decoration-none text-light">
                  <FaUser />
                  <span>Account</span>
                </a>
                <a href="/cart" className="d-flex align-items-center gap-1 text-decoration-none text-light">
                  <FaClipboard />
                  <span>Cart: ({totalItems})</span>
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Main Header */}
      <header id="header">
        <Container>
          <div className="d-flex justify-content-between align-items-center py-4">
            {/* Logo */}
            <div className="logo">
              <Link to="/">
                <img src="images/main-logo.png" alt="logo" className="h-10" />
              </Link>
            </div>

            {/* Navbar */}
            <Navbar expand="lg" className="w-100">
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto">
                  {!user ? (
                    <>
                      <Nav.Item><Nav.Link as={Link} to="/" className="custom-link">Home</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link href="#featured-books" className="custom-link">Featured</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link href="#best-selling" className="custom-link">Best Selling</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link href="#popular-books" className="custom-link">Popular</Nav.Link></Nav.Item>
                      <Nav.Item><Nav.Link href="#latest-blog" className="custom-link">Articles</Nav.Link></Nav.Item>
                    </>
                  ) : (
                    <Nav.Item>
                      <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </Nav.Item>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Header;
