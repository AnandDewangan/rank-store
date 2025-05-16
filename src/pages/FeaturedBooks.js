import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/books/featured-books`);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Featured Books | Affordable & Popular Reads | Rank Publishing House
        </title>
        <meta
          name="description"
          content="Explore featured books handpicked by Rank Publishing House. Discover bestsellers, affordable books, and popular reads for all age groups."
        />
        <meta
          name="keywords"
          content="featured books, rank store, rank publishing, buy books online, cheap books, best authors, affordable books, publishing house Chhattisgarh"
        />
        <meta property="og:title" content="Featured Books at Rank Store" />
        <meta
          property="og:description"
          content="Browse top featured books with fast delivery and affordable pricing. Rank Publishing House — Trusted by authors and readers."
        />
        <meta property="og:image" content="/images/product-item1.jpg" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.rankstore.in/featured-books"
        />
      </Helmet>

      <section id="featured-books" className="py-5 my-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="section-header text-center mb-4">
                <div className="title text-danger">
                  <span>Some quality items</span>
                </div>
                <h2 className="section-title text-primary">Featured Books</h2>
              </div>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading featured books...</p>
            </div>
          ) : (
            <motion.div
              className="product-list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Row>
                {books.map((book, index) => (
                  <Col md={3} key={index} className="mb-4">
                    <motion.div
                      className="product-item text-center"
                      variants={itemVariants}
                      // whileHover={{ scale: 1.05 }}
                    >
                      <Link
                to={`/books/${book._id}`}
                className="text-decoration-none w-100"
              >
                      <div className="flip-card shadow border rounded">
                        <div className="flip-card-inner">
                          <div className="flip-card-front d-flex align-items-center justify-content-center">
                            <img
                              src={book.cover_image}
                              alt={book.title}
                              className="img-fluid rounded"
                              style={{ maxHeight: "220px", objectFit: "cover" }}
                            />
                          </div>
                          <div className="flip-card-back">
                            <h6 className="text-danger">ISBN-{book.isbn}</h6>
                            <h5 className="text-primary">{book.title}</h5>
                            <p className="text-secondary">{book.author}</p>
                            <p className="text-dark">Book Size-{book.size}</p>
                            <p className="text-success">
                              No of Pages-{book.pages}
                            </p>
                          </div>
                        </div>
                      </div>
                      </Link>
                      <figcaption className="item-price fs-5 fw-bold mt-3">
                        {book.rankMrp &&
                        book.paperMrp &&
                        book.rankMrp !== book.paperMrp ? (
                          <>
                            <span className="text-muted text-decoration-line-through me-2 fs-6">
                              ₹{book.paperMrp}
                            </span>
                            <span className="text-success">
                              ₹{book.rankMrp}
                            </span>
                          </>
                        ) : (
                          <span className="text-success">
                            ₹{book.rankMrp || book.paperMrp}
                          </span>
                        )}
                      </figcaption>
                      <Button variant="danger" size="md" className="my-2">
                        Add to Cart
                      </Button>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}

          <Row className="mt-4 text-center">
            <Col md={12}>
              <a href="/books" className="btn btn-outline-danger">
                View all products{" "}
                <i className="ms-2 icon icon-ns-arrow-right"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FeaturedBooks;
