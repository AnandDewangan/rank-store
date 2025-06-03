import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-light py-5 mt-5 border-top">
      <div className="container">
        <div className="row gy-4 align-items-start mx-auto">
          {/* Logo Section */}
          <div className="col-md-2">
            <div className="footer-item">
              <img
                src="/logo192.png"
                alt="Logo"
                className="footer-logo mb-3"
                style={{ height: "150px" }}
              />
            </div>
          </div> 
            <div className="col-md-4 my-auto">
              <p className="text-muted">
                Your trusted destination for books and knowledge. Explore our
                featured collections and articles.
              </p>
            </div>
          {/* Discover Section */}
          <div className="col-md-3">
            <h5 className="text-primary mb-3">Discover</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-muted">
                  Home
                </a>
              </li>
              <li>
                <a href="#featured-books" className="text-decoration-none text-muted">
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="#best-selling"
                  className="text-decoration-none text-muted"
                >
                  Best Selling
                </a>
              </li>
              <li>
                <a href="#popular-books" className="text-decoration-none text-muted">
                  Popular
                </a>
              </li>
              <li>
                <a href="#latest-blog" className="text-decoration-none text-muted">
                  Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-md-3">
            <h5 className="text-primary mb-3">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/cart"
                  className="text-decoration-none text-muted"
                >
                  View Cart
                </a>
              </li>
              <li>
                <a
                  href="/term-conditions"
                  className="text-decoration-none text-muted"
                >
                  Term & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-decoration-none text-muted"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-decoration-none text-muted"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
