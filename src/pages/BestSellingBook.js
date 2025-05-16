import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const BestSellingBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/orders/best-selling`);
        if (res.data.length > 0) {
          setBook(res.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch best selling book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSeller();
  }, []);

  if (loading) {
    return (
      <section className="py-5 text-center bg-dark text-white">
        <Spinner animation="border" variant="light" />
      </section>
    );
  }

  if (!book) {
    return (
      <section className="py-5 text-center bg-dark text-white">
        <h2>No best selling book found.</h2>
      </section>
    );
  }

  const { title, author, cover_image, rankMrp, paperMrp } = book.book;

  return (
    <>
      <Helmet>
        <title>Best Selling Book | Rank Publishing House</title>
        <meta
          name="description"
          content={`Buy the best-selling book '${title}' by ${author} at Rank Store. Fast delivery, affordable price, and available for publishing too.`}
        />
        <meta
          name="keywords"
          content={`best selling book, ${title}, buy book online, affordable book, fast delivery, publish book, self publishing, rank store, rank publishing house`}
        />
        <meta property="og:title" content="Best Selling Book | Rank Store" />
        <meta
          property="og:description"
          content={`Grab the most popular book '${title}' only at Rank Publishing House. Trusted bookstore and publishing platform.`}
        />
        <meta property="og:image" content={cover_image} />
        <meta
          property="og:url"
          content="https://www.rankstore.in/best-selling-book"
        />
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
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={cover_image}
                  alt={`${title} book`}
                  className="single-image img-fluid d-block mx-auto rounded"
                  width={400}
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
                  <div className="author-name mb-2 text-warning">
                    By {author}
                  </div>
                  <h3 className="item-title mb-3 text-primary">{title}</h3>
                  <p className="mb-4">
                    One of our top-selling books loved by readers across the
                    globe. Order your copy now and experience the magic!
                  </p>
                  <figcaption className="item-price fs-4 fw-bold my-2">
                    {rankMrp && paperMrp && rankMrp !== paperMrp ? (
                      <>
                        <span className="text-danger text-decoration-line-through me-2 fs-6">
                          ₹{paperMrp}
                        </span>
                        <span className="text-success">₹{rankMrp}</span>
                      </>
                    ) : (
                      <span className="text-success">
                        ₹{rankMrp || paperMrp}
                      </span>
                    )}
                  </figcaption>
                  <Button variant="danger">Add to Cart</Button>
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
