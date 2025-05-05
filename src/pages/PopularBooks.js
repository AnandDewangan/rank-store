// BookshelfSection.jsx
import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

const genres = [
  "All Genre",
  "Business",
  "Technology",
  "Romantic",
  "Adventure",
  "Fictional",
];

const books = [
  {
    id: 1,
    title: "Portrait photography",
    author: "Adam Silber",
    genre: "Technology",
    image: "images/tab-item1.jpg",
    price: 40,
  },
  {
    id: 2,
    title: "Once upon a time",
    author: "Klien Marry",
    genre: "Fictional",
    image: "images/tab-item2.jpg",
    price: 35,
  },
  {
    id: 3,
    title: "Tips of simple lifestyle",
    author: "Bratt Smith",
    genre: "Business",
    image: "images/tab-item3.jpg",
    price: 40,
  },
  {
    id: 4,
    title: "Just felt from outside",
    author: "Nicole Wilson",
    genre: "Romantic",
    image: "images/tab-item4.jpg",
    price: 40,
  },
  {
    id: 5,
    title: "Peaceful Enlightment",
    author: "Marmik Lama",
    genre: "Business",
    image: "images/tab-item5.jpg",
    price: 40,
  },
  {
    id: 6,
    title: "Great travel at desert",
    author: "Sanchit Howdy",
    genre: "Adventure",
    image: "images/tab-item6.jpg",
    price: 40,
  },
  {
    id: 7,
    title: "Life among the pirates",
    author: "Armor Ramsey",
    genre: "Adventure",
    image: "images/tab-item7.jpg",
    price: 40,
  },
  {
    id: 8,
    title: "Simple way of piece life",
    author: "Armor Ramsey",
    genre: "Romantic",
    image: "images/tab-item8.jpg",
    price: 40,
  },
];

const PopularBooks = () => {
  const [selectedGenre, setSelectedGenre] = useState("All Genre");

  const filteredBooks =
    selectedGenre === "All Genre"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
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
            <span className="text-danger">Some quality items</span>
            <h2 className="fw-bold text-primary">Popular Books</h2>
          </div>

          {/* Genre Tabs */}
          <ul className="nav justify-content-center mb-4">
            {genres.map((genre) => (
              <li className="nav-item mx-2" key={genre}>
                <button
                  className={`btn bg-transparent border-0 px-2 py-1 ${
                    selectedGenre === genre
                      ? "border-bottom border-danger text-danger"
                      : "text-secondary"
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              </li>
            ))}
          </ul>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Slider {...settings}>
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  className="p-3"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card shadow-sm h-100 border-0">
                    <div
                      className="d-flex justify-content-center align-items-center bg-white"
                      style={{ height: "280px", overflow: "hidden" }}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title text-primary">{book.title}</h5>
                      <p className="card-text text-muted">{book.author}</p>
                      <p className="fw-bold">${book.price.toFixed(2)}</p>
                      <Button
                        variant="danger"
                        className="d-inline-flex align-items-center"
                      >
                        Buy Now <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PopularBooks;
