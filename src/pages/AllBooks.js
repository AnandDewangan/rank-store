import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-primary">All Books</h2>
      <Row>
        {books.map((book, index) => (
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
                <h5 className="fw-bold text-dark">{book.title}</h5>
                <p className="text-muted small mb-1">{book.author}</p>
              </Link>
              <div className="item-price fs-6 fw-semibold mb-2">
                {book.rankMrp &&
                book.paperMrp &&
                book.rankMrp !== book.paperMrp ? (
                  <>
                    <span className="text-muted text-decoration-line-through me-2">
                      ₹ {book.paperMrp}
                    </span>
                    <span className="text-danger">₹ {book.rankMrp}</span>
                  </>
                ) : (
                  <span className="text-danger">
                    ₹ {book.rankMrp || book.paperMrp}
                  </span>
                )}
              </div>

              <Button variant="danger" size="sm" className="mt-auto w-100">
                Add to Cart
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllBooks;
