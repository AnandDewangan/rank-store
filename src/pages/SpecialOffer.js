import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

const books = [
  {
    title: "Simple way of piece life",
    author: "Armor Ramsey",
    originalPrice: "$50.00",
    discountPrice: "$40.00",
    image: "images/product-item1.jpg",
  },
  {
    title: "Great travel at desert",
    author: "Sanchit Howdy",
    originalPrice: "$30.00",
    discountPrice: "$38.00",
    image: "images/product-item2.jpg",
  },
  {
    title: "The lady beauty Scarlett",
    author: "Arthur Doyle",
    originalPrice: "$45.00",
    discountPrice: "$35.00",
    image: "images/product-item3.jpg",
  },
  {
    title: "Once upon a time",
    author: "Klien Marry",
    originalPrice: "$40.00",
    discountPrice: "$30.00",
    image: "images/product-item4.jpg",
  },
];

// Framer Motion variants for container and items
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

const SpecialOffer = () => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Special Offers on Discounted Books | BookStore</title>
        <meta
          name="description"
          content="Explore our limited-time book offers. Grab bestselling novels, travel guides, and more at discounted prices. Shop now!"
        />
        <meta
          name="keywords"
          content="book offers, discount books, bestsellers, novels, book deals"
        />
        <meta property="og:title" content="Special Offers on Books" />
        <meta
          property="og:description"
          content="Shop our discounted books collection. Limited-time offers!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourdomain.com/special-offers"
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/offer-banner.jpg"
        />
      </Helmet>

      <section id="special-offer" className="py-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="section-header text-center mb-4">
                <div className="title text-danger">
                  <span>Grab your opportunity</span>
                </div>
                <motion.h2
                  className="section-title text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Books with Offer
                </motion.h2>
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
            <Slider {...settings}>
              {books.map((book, index) => (
                <div key={index}>
                  <motion.div
                    className="product-item text-center"
                    variants={itemVariants}
                  >
                    <figure className="product-style mb-3 d-flex justify-content-center align-items-center flex-column">
                      <motion.img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid mb-3"
                        style={{ width: "80%" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Button variant="danger" size="sm" className="mt-2">
                        Add to Cart
                      </Button>
                    </figure>
                    <figcaption className="text-center">
                      <h5>{book.title}</h5>
                      <span className="text-muted d-block mb-1">
                        {book.author}
                      </span>
                      <div className="item-price d-flex justify-content-center align-items-center">
                        <span className="text-decoration-line-through text-muted me-2">
                          {book.originalPrice}
                        </span>
                        <span className="fs-4 fw-bold text-primary">
                          {book.discountPrice}
                        </span>
                      </div>
                    </figcaption>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>

          <Row className="mt-4 text-center">
            <Col md={12} className="text-center">
              <a href="#" className="btn btn-outline-danger">
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

export default SpecialOffer;
