import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-light py-5">
        <div className="container">
          <div className="row gy-4">
            {/* Company Brand */}
            <div className="col-md-4">
              <div className="footer-item">
                <img
                  src="logo192.png"
                  alt="logo"
                  className="footer-logo"
                />
              </div>
            </div>

            {/* About Us */}
            <div className="col-md-2">
              <h5 className="text-primary">About Us</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Vision</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Articles</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Careers</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Service Terms</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Donate</a></li>
              </ul>
            </div>

            {/* Discover */}
            <div className="col-md-2">
              <h5 className="text-primary">Discover</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Home</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Books</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Authors</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Subjects</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Advanced Search</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div className="col-md-2">
              <h5 className="text-primary">My Account</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Sign In</a></li>
                <li><a href="#" className="text-decoration-none text-muted">View Cart</a></li>
                <li><a href="#" className="text-decoration-none text-muted">My Wishlist</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Track My Order</a></li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-md-2">
              <h5 className="text-primary">Help</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Help Center</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Report a Problem</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Suggesting Edits</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
