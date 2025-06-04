import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import "../App.css";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/books`)
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let result = books;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(lowerSearch) ||
          book.author?.toLowerCase().includes(lowerSearch) ||
          book.rph_code?.toLowerCase().includes(lowerSearch)
      );
    }

    if (category) {
      result = result.filter((book) => book.cat === category);
    }

    setFilteredBooks(result);
  }, [search, category, books]);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-primary">All Books</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by title, author, or RPH code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="General">General</option>
            <option value="Education">Education</option>
            <option value="Biography">Biography</option>
            <option value="Academic">Academic</option>
            <option value="Poetry">Poetry</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Comics">Comics</option>
            <option value="Social">Social</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <Col md={3} sm={6} xs={12} key={index} className="mb-4">
              <div className="border shadow-sm rounded p-3 h-100 d-flex flex-column align-items-center text-center book-card">
                <Link
                  to={`/books/${book._id}`}
                  className="text-decoration-none w-100"
                >
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="img-fluid mb-3"
                    style={{
                      maxHeight: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h5 className="fw-bold text-dark text-truncate">{book.title}</h5>
                  <p className="text-muted small mb-1 text-truncate">{book.author}</p>
                </Link>
                <div className="item-price fs-5 fw-semibold mb-2">
                  {book.rankMrp &&
                  book.paperMrp &&
                  book.rankMrp !== book.paperMrp ? (
                    <>
                      <span className="text-muted text-decoration-line-through fs-6 me-2">
                        ₹ {book.paperMrp}
                      </span>
                      <span className="text-success">₹ {book.rankMrp}</span>
                    </>
                  ) : (
                    <span className="text-success">
                      ₹ {book.rankMrp || book.paperMrp}
                    </span>
                  )}
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  className="mt-auto w-100"
                  onClick={() => {
                    addToCart(book);
                    toast.success("Book Add to Cart");
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </Row>
    </Container>
  );
};

export default AllBooks;
