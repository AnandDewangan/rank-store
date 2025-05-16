import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Container, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const WeeklyTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/feedbacks`);
        if (res.data.length > 0) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Helmet>
        <title>Author Testimonial | Rank Publishing</title>
        <meta
          name="description"
          content="Real feedback from satisfied authors about their publishing journey with Rank Publishing."
        />
        <meta
          name="keywords"
          content="author testimonials, publishing experience, feedback, writers, Rank Publishing"
        />
        <meta
          property="og:title"
          content="Author Testimonial - Rank Publishing"
        />
        <meta
          property="og:description"
          content="See what authors are saying about their publishing experience with Rank Publishing."
        />
      </Helmet>

      <section className="bg-dark text-white py-5">
        <Container>
          <motion.h2
            className="text-center text-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Testimonials from our Authors
          </motion.h2>

          {testimonials.length > 0 && (
            <Carousel
              fade
              controls={false}
              indicators={false}
              interval={4000}
              className="mt-4"
            >
              {testimonials.map((testimonial, index) => (
                <Carousel.Item key={index}>
                  <motion.figure
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <blockquote className="blockquote">
                      <p className="fs-4 fst-italic">“{testimonial.message}”</p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-warning mt-2">
                      {testimonial.author}
                    </figcaption>
                  </motion.figure>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Container>
      </section>
    </>
  );
};

export default WeeklyTestimonial;
