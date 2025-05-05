import React from "react";

const DownloadApp = () => {
  return (
    <section id="download-app" className="bg-dark text-white py-5 position-relative">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Left Section - Phone Image */}
          <div className="col-md-5 text-center text-md-start">
            <figure>
              <img src="images/device.png" alt="phone" className="img-fluid" />
            </figure>
          </div>

          {/* Right Section - App Info */}
          <div className="col-md-7 mt-4 mt-md-0">
            <div className="app-info">
              <h2 className="section-title text-primary mb-4">
                Download our app now!
              </h2>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus libero lectus non et
                psryroin. Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames semper erat ac in
                suspendisse iaculis.
              </p>
              <div className="google-app d-flex gap-3 mt-4">
                <img
                  src="images/google-play.jpg"
                  alt="google play"
                  className="img-fluid w-25"
                />
                <img
                  src="images/app-store.jpg"
                  alt="app store"
                  className="img-fluid w-25"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Corner Pattern Overlay */}
      <div className="corner-pattern-overlay position-absolute top-0 end-0">
        {/* You can add an image or pattern here */}
      </div>
    </section>
  );
};

export default DownloadApp;
