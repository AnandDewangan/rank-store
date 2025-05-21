import React from "react";

export default function ContactUs() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Contact Us</h2>
      <div className="row g-4">
        {/* Contact Form */}
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Subject"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Your message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details & Map */}
        <div className="col-md-6">
          <div className="mb-4">
            <h5>📍 Address</h5>
            <p>Chingrajpara Sarkanda Bilaspur, Chhattisgarh(495001) India</p>

            <h5>📧 Email</h5>
            <p>books@rankpublishinghouse.online</p>

            <h5>📞 Phone</h5>
            <p>+91-9171242297</p>
          </div>

          {/* Google Map Embed */}
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.8841103054274!2d82.16962157562385!3d22.092242379836787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280bc3b8e34aed%3A0x7ebc4188a331f11b!2sRank%20Publishing%20House!5e0!3m2!1sen!2sin!4v1744966633741!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
