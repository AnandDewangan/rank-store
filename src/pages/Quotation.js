import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

const Quotation = () => {
  return (
    <>
      <Helmet>
        <title>Quote of the Week | Rank Publishing</title>
        <meta
          name="description"
          content="Weekly inspiration for readers: 'The more you read, the more places you'll go.' — Dr. Seuss"
        />
        <meta
          name="keywords"
          content="quote of the week, reading quote, Dr. Seuss, inspirational book quotes, motivation for readers"
        />
        <meta property="og:title" content="Quote of the Week - Rank Publishing" />
        <meta
          property="og:description"
          content="Discover inspiring reading quotes weekly. This week: Dr. Seuss reminds us how far reading can take us."
        />
      </Helmet>

      <section
        id="quotation"
        className="bg-dark text-white quotation-section py-5"
      >
        <div className="container">
          <motion.h2
            className="section-title text-center text-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Quote of the Week
          </motion.h2>

          <motion.figure
            className="text-center mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <blockquote className="blockquote">
              <p className="quote-text fs-4 fst-italic">
                “The more that you read, the more things you will know. The more
                that you learn, the more places you’ll go.”
              </p>
            </blockquote>
            <figcaption className="blockquote-footer text-primary mt-2">
              Dr. Seuss <cite title="Source Title">— American Author</cite>
            </figcaption>
          </motion.figure>
        </div>
      </section>
    </>
  );
};

export default Quotation;
