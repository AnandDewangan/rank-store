import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Helmet } from "react-helmet";

const BestSellingBook = () => {
  return (
    <>
      <Helmet>
        <title>Best Selling Book | Rank Publishing House</title>
        <meta
          name="description"
          content="Buy the best-selling book 'Birds gonna be happy' by Timbur Hood at Rank Store. Fast delivery, affordable price, and available for publishing too."
        />
        <meta
          name="keywords"
          content="best selling book, birds gonna be happy, buy book online, affordable book, fast delivery, publish book, self publishing, rank store, rank publishing house"
        />
        <meta property="og:title" content="Best Selling Book | Rank Store" />
        <meta
          property="og:description"
          content="Grab the most popular book 'Birds gonna be happy' only at Rank Publishing House. Trusted bookstore and publishing platform."
        />
        <meta property="og:image" content="/images/single-image.jpg" />
        <meta property="og:url" content="https://www.rankstore.in/best-selling-book" />
        <meta property="og:type" content="article" />
      </Helmet>

      <section
        id="best-selling"
        className="leaf-pattern-overlay position-relative py-5 bg-dark text-white"
      >
        <div className="corner-pattern-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        <Container>
          <motion.h2
            className="section-title text-center divider mb-5 text-primary"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Best Selling Book
          </motion.h2>

          <Row className="align-items-center">
            <Col lg={7}>
              <motion.figure
                className="products-thumb"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="images/single-image.jpg"
                  alt="Birds gonna be happy book"
                  className="single-image img-fluid d-block mx-auto"
                />
              </motion.figure>
            </Col>

            <Col lg={5}>
              <motion.div
                className="product-entry text-center text-lg-start"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="products-content">
                  <div className="author-name mb-2">By Timbur Hood</div>
                  <h3 className="item-title mb-3 text-primary">Birds gonna be happy</h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac.
                  </p>
                  <div className="item-price mb-4 fs-4 fw-bold">$ 45.00</div>
                  <Button variant="danger">
                    Buy Now <FaArrowRight className="ms-2" />
                  </Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BestSellingBook;
