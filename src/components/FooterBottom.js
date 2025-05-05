import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const FooterBottom = () => {
  return (
    <div id="footer-bottom" className="bg-dark text-light py-3">
      <div className="container">
        <div className="row align-items-center">
          {/* Left - Copyright */}
          <div className="col-md-8 text-center text-md-start">
            <p className="mb-0">
              © 2025 All rights reserved by{" "}
              <a
                href="https://www.rankpublishinghouse.online/"
                className="text-decoration-none text-warning"
              >
                R<span className="text-danger">A</span>NK PUBLISHING HOUSE
              </a>
              . Developed by{" "}
              <a
                href="https://www.linkedin.com/in/anand-dewangan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-warning"
              >
                ANAND DEWANGAN
              </a>
            </p>
          </div>

          {/* Right - Social Links */}
          <div className="col-md-4 text-end mt-3 mt-md-0">
            <div className="d-flex gap-3 text-secondary justify-content-end align-items-center">
              <a href="#" className="text-danger">
                <FaInstagram /> 
              </a>
              <a href="#" className="text-primary">
                <FaFacebook />
              </a>
              <a href="#" className="text-danger">
                <FaYoutube />
              </a>
              <a href="#" className="text-primary">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
