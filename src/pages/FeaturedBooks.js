import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const books = [
  {
    title: 'Simple way of piece life',
    author: 'Armor Ramsey',
    price: '$ 40.00',
    image: 'images/product-item1.jpg',
  },
  {
    title: 'Great travel at desert',
    author: 'Sanchit Howdy',
    price: '$ 38.00',
    image: 'images/product-item2.jpg',
  },
  {
    title: 'The lady beauty Scarlett',
    author: 'Arthur Doyle',
    price: '$ 45.00',
    image: 'images/product-item3.jpg',
  },
  {
    title: 'Once upon a time',
    author: 'Klien Marry',
    price: '$ 35.00',
    image: 'images/product-item4.jpg',
  },
];

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
  return (
    <>
      <Helmet>
        <title>Featured Books | Affordable & Popular Reads | Rank Publishing House</title>
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
        <meta property="og:url" content="https://www.rankstore.in/featured-books" />
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
                    whileHover={{ scale: 1.05 }}
                  >
                    <figure className="product-style mb-3">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid"
                      />
                      <Button variant="danger" size="sm" className="mt-2">
                        Add to Cart
                      </Button>
                    </figure>
                    <figcaption>
                      <h5>{book.title}</h5>
                      <span className="text-primary d-block mb-1">{book.author}</span>
                      <div className="item-price fs-5 fw-bold">{book.price}</div>
                    </figcaption>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          <Row className="mt-4 text-center">
            <Col md={12} className="text-center">
              <a href="#" className="btn btn-outline-danger">
                View all products <i className="ms-2 icon icon-ns-arrow-right"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FeaturedBooks;
