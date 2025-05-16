import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Billboard = () => {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/images`)
      .then((res) => {
        setSlides(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading slides:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center my-5">Loading slides...</p>;

  return (
    <>
      <Helmet>
        <title>Rank Publishing House | Fast & Affordable Book Publishing</title>
        <meta
          name="description"
          content="Rank Store and Rank Publishing House offers fast, cheap, and recommended services to buy, sell, and publish books in Bilaspur, Chhattisgarh and across India."
        />
        <meta
          name="keywords"
          content="rank store, rank publishing, rank publishing house, book store, publish book, self publish, bilaspur, chhattisgarh, affordable, fast, cheap, recommended"
        />
        <meta name="author" content="Rank Publishing House" />
        <meta
          property="og:title"
          content="Rank Publishing House | Fast Book Publishing"
        />
        <meta
          property="og:description"
          content="Publish or sell your books at Rank Publishing House – trusted and affordable service in Bilaspur, Chhattisgarh."
        />
        <meta property="og:image" content="/images/main-banner1.jpg" />
        <meta property="og:url" content="https://www.rankstore.in" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.section
        id="billboard"
        className="position-relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container-fluid px-0">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={true}
            indicators={false}
            fade
            interval={5000}
            prevIcon={
              <span className="bg-dark text-white p-2 rounded-circle d-flex align-items-end justify-content-center">
                <FaChevronLeft size={16} />
              </span>
            }
            nextIcon={
              <span className="bg-dark text-white p-2 rounded-circle d-flex align-items-center justify-content-center">
                <FaChevronRight size={16} />
              </span>
            }
          >
            {slides.map((slide, i) => (
              <Carousel.Item key={slide._id || i}>
                <motion.div
                  className="row no-gutters align-items-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="col-lg-5 p-5 text-center text-lg-end">
                    <motion.h2
                      className="display-5 fw-bold mb-3 text-danger"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.title || "Untitled"}
                    </motion.h2>
                    <motion.p
                      className="lead mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {slide.description || "No description available."}
                    </motion.p>
                    <motion.h6
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <figcaption className="blockquote-footer text-primary mt-2">
                        {slide.name || "NA"}
                      </figcaption>
                    </motion.h6>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {/* <Button variant="danger">
                        Buy Now <FaArrowRight className="ms-2" />
                      </Button> */}
                    </motion.div>
                  </div>

                  <div className="col-lg-7 p-5">
                    <motion.img
                      src={slide.url}
                      alt={slide.title || "Banner Image"}
                      className="d-block mx-auto img-fluid w-50 shadow-lg rounded-3"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </motion.section>
    </>
  );
};

export default Billboard;
