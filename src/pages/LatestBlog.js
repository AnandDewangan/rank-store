import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const blogPosts = [
  {
    date: "Mar 30, 2021",
    title: "Reading books always makes the moments happy",
    image: "images/post-img1.jpg",
    category: "Inspiration",
  },
  {
    date: "Mar 29, 2021",
    title: "Reading books always makes the moments happy",
    image: "images/post-img2.jpg",
    category: "Inspiration",
  },
  {
    date: "Feb 27, 2021",
    title: "Reading books always makes the moments happy",
    image: "images/post-img3.jpg",
    category: "Inspiration",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LatestBlog = () => {
  return (
    <>
      <Helmet>
        <title>Latest Articles | Book Blog & Inspiration | Rank Publishing House</title>
        <meta
          name="description"
          content="Read the latest inspirational articles and blog posts from Rank Publishing House. Explore topics about reading habits, book reviews, and more."
        />
        <meta
          name="keywords"
          content="book blog, inspirational articles, book reading tips, publishing house blog, Rank Publishing, read books blog, author blog India"
        />
        <meta property="og:title" content="Rank Publishing House Blog" />
        <meta
          property="og:description"
          content="Explore thoughtful blog posts about the joy of reading, author experiences, and inspirational book journeys."
        />
        <meta property="og:image" content="/images/post-img1.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.rankstore.in/blog" />
      </Helmet>

      <section id="latest-blog" className="py-5 bg-dark text-light">
        <Container>
          <Row>
            <Col md={12}>
              <div className="section-header text-center mb-4">
                <div className="title">
                  <span className="text-danger">Read our articles</span>
                </div>
                <motion.h2
                  className="section-title mb-4 text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Latest Articles
                </motion.h2>
              </div>
            </Col>
          </Row>

          <motion.div
            className="row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {blogPosts.map((post, index) => (
              <Col md={4} key={index}>
                <motion.article
                  className="column p-2"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <figure className="mb-3 position-relative">
                    <a
                      href="#"
                      className="d-block position-relative overflow-hidden rounded-3"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="post-image img-fluid w-100"
                      />
                      <div className="categories position-absolute bottom-0 start-0 bg-white text-primary text-end py-1 px-3 m-3 rounded-3">
                        {post.category}
                      </div>
                    </a>
                  </figure>

                  <div className="post-item">
                    <div className="meta-date text-danger mb-2">{post.date}</div>
                    <h3>
                      <a
                        href="#"
                        className="text-light fw-semibold text-decoration-none"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <div className="links-element mt-2">
                      <div className="social-links">
                        <ul className="d-flex list-unstyled mt-2">
                          <li className="me-3">
                            <a href="#"><i className="icon icon-facebook" style={{ fontSize: "18px" }}></i></a>
                          </li>
                          <li className="me-3">
                            <a href="#"><i className="icon icon-twitter" style={{ fontSize: "18px" }}></i></a>
                          </li>
                          <li className="me-3">
                            <a href="#"><i className="icon icon-behance-square" style={{ fontSize: "18px" }}></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Col>
            ))}
          </motion.div>

          <Row className="mt-4 text-center">
            <Col md={12}>
              <Button variant="outline-warning" className="btn-accent-arrow">
                Read All Articles <i className="icon icon-ns-arrow-right"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LatestBlog;
