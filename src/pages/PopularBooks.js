import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/orders/best-selling`);
        if (res.data.length > 0) {
          setBooks(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch best selling book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSeller();
  }, []);

  const handleAddToCart = (book) => {
    addToCart({ ...book, quantity: 1 });
  };

  return (
    <>
      <Helmet>
        <title>Popular Books | Shop Trending Genres & Top Authors</title>
        <meta
          name="description"
          content="Explore and buy popular books across genres like Business, Technology, Romance, and Adventure. Handpicked by Rank Publishing House for passionate readers."
        />
        <meta
          name="keywords"
          content="popular books, trending books, bestsellers, romantic novels, tech books, business books, adventure fiction, Rank Publishing"
        />
        <meta property="og:title" content="Popular Books by Rank Publishing" />
        <meta
          property="og:description"
          content="Discover top-selling books by genre. From business insights to fictional journeys — find your next great read."
        />
        <meta property="og:image" content="/images/tab-item1.jpg" />
        <meta
          property="og:url"
          content="https://www.rankstore.in/popular-books"
        />
        <meta property="og:type" content="product.group" />
      </Helmet>

      <section className="py-5 my-5 bg-light" id="popular-books">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-danger">Bestsellers</span>
            <h2 className="fw-bold text-primary">Popular Books</h2>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="d-flex overflow-auto gap-4 px-2 pb-3 scroll-snap-x">
                {books.map((item) => {
                  const book = item.book;
                  return (
                    <motion.div
                      key={book._id}
                      className="card shadow-sm border-0 flex-shrink-0"
                      style={{ width: "250px", scrollSnapAlign: "start" }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={`/books/${book._id}`}
                        className="text-decoration-none w-100"
                      >
                        <div
                          className="d-flex justify-content-center align-items-center bg-white"
                          style={{ height: "250px", overflow: "hidden" }}
                        >
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="img-fluid rounded"
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </Link>
                      <div className="card-body text-center">
                        <h5 className="card-title text-primary">{book.title}</h5>
                        <p className="card-text text-muted">{book.author}</p>
                        <figcaption className="item-price fs-5 fw-bold">
                          {book.rankMrp &&
                          book.paperMrp &&
                          book.rankMrp !== book.paperMrp ? (
                            <>
                              <span className="text-muted text-decoration-line-through me-2 fs-6">
                                ₹ {book.paperMrp}
                              </span>
                              <span className="text-success">
                                ₹ {book.rankMrp}
                              </span>
                            </>
                          ) : (
                            <span className="text-success">
                              ₹ {book.rankMrp || book.paperMrp}
                            </span>
                          )}
                        </figcaption>
                        <Button
                          variant="danger"
                          className="d-inline-flex align-items-center mt-2"
                          onClick={() => handleAddToCart(book)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <Row className="mt-4 text-center">
                <Col md={12}>
                  <a href="/books" className="btn btn-outline-danger">
                    View all products{" "}
                    <i className="ms-2 icon icon-ns-arrow-right"></i>
                  </a>
                </Col>
              </Row>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default PopularBooks;
