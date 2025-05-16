import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
const baseURL = process.env.REACT_APP_API_BASE_URL;

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
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Latest Articles | Book Blog & Inspiration | Rank Publishing House
        </title>
        <meta
          name="description"
          content="Explore latest inspirational articles and book stories from Rank Publishing House."
        />
        <meta property="og:title" content="Rank Publishing House Blog" />
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
            {articles.map((article, index) => (
              <Col md={4} key={article._id}>
                <motion.article
                  className="column p-2"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <figure className="mb-3 position-relative">
                    <a
                      href="#"
                      className="d-block position-relative overflow-hidden rounded-3"
                    >
                      <img
                        src={article.image}
                        alt={article.topic}
                        className="post-image img-fluid w-100"
                      />
                      <div className="categories position-absolute bottom-0 start-0 bg-white text-primary text-end py-1 px-3 m-3 rounded-3">
                        {article.topic}
                      </div>
                    </a>
                  </figure>

                  <div className="post-item">
                    <div className="meta-date text-danger mb-2">
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <p className="text-light">{article.description}</p>
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
