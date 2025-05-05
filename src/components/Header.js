import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div id="header-wrap">
      {/* Top Content (Social Links, Account, Cart, Search) */}
      <div className="top-content bg-dark">
        <Container>
          <div className="d-flex justify-content-between py-2">
            {/* Social Links */}
            <div className="d-flex gap-3 text-secondary">
              <a href="#" className="text-danger">
                <FaInstagram />
              </a>
              <a href="#" className="text-primary">
                <FaFacebookF />
              </a>
              <a href="#" className="text-danger">
                <FaYoutube />
              </a>
              <a href="#" className="text-primary">
                <FaLinkedin />
              </a>
            </div>

            {/* Account, Cart, Search */}
            <div className="d-flex align-items-center gap-4">
              <a
                href="#"
                className="d-flex align-items-center gap-1 text-decoration-none text-light"
              >
                <FaUser />
                <span>Account</span>
              </a>
              <a
                href="#"
                className="d-flex align-items-center gap-1 text-decoration-none text-light"
              >
                <FaClipboard />
                <span>Cart: (0)</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header with Navbar */}
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
                  <Nav.Item>
                    <Nav.Link as={Link} to="/" className="custom-link">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#featured-books" className="custom-link">
                      Featured
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#best-selling" className="custom-link">
                      Best Selling
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#popular-books" className="custom-link">
                      Popular
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#special-offer" className="custom-link">
                      Offer
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#latest-blog" className="custom-link">
                      Articles
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#download-app" className="custom-link">
                      Download App
                    </Nav.Link>
                  </Nav.Item>
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
