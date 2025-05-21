import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import "../App.css";
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]); 
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));

    // Load existing reviews
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "{}");
    setReviews(allReviews[id] || []);
  }, [id, baseURL]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();

    const ratedBooks = JSON.parse(localStorage.getItem("ratedBooks") || "{}");
    if (ratedBooks[id] === email) {
      setMessage("You have already rated this book with this email.");
      return;
    }

    const newReview = {
      email,
      rating,
      description: reviewDescription,
      date: new Date().toLocaleString(),
    };

    // Save to localStorage
    ratedBooks[id] = email;
    localStorage.setItem("ratedBooks", JSON.stringify(ratedBooks));

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "{}");
    const bookReviews = allReviews[id] || [];
    const updatedReviews = [...bookReviews, newReview];
    allReviews[id] = updatedReviews;
    localStorage.setItem("reviews", JSON.stringify(allReviews));
    setReviews(updatedReviews);

    setReviewed(true);
    setMessage("Thanks for your rating!");
  };

  const handleAddToCart = () => {
    addToCart({ ...book, quantity: 1 });
    toast.success("Book added to cart!");
  };

  const renderStars = (value) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < value ? "#ffc107" : "#e4e5e9" }}>
        ★
      </span>
    ));

  if (!book) return <p className="text-center mt-5">Loading book details...</p>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={5} className="mb-4 text-center">
          <img
            src={book.cover_image}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
        <Col md={7}>
          <h2 className="text-primary fw-bold">{book.title}</h2>
          <p className="text-muted">by {book.author}</p>
          <div className="mb-3">
            {book.rankMrp !== book.paperMrp ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  ₹ {book.paperMrp}
                </span>
                <span className="text-success fw-bold fs-4">
                  ₹ {book.rankMrp}
                </span>
              </>
            ) : (
              <span className="text-success fw-bold fs-4">
                ₹ {book.rankMrp}
              </span>
            )}
          </div>

          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Pages:</strong> {book.pages}
          </p>
          <p>
            <strong>Size:</strong> {book.size}
          </p>
          <p>
            <strong>Color:</strong> {book.color}
          </p>
          <p>
            <strong>Cover Type:</strong> {book.cover}
          </p>

          {book.description && (
            <p className="mt-3">
              <strong>Description:</strong> {book.description}
            </p>
          )}

          <Button variant="danger" className="mt-3" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>

      <hr />

      <Row className="mt-4">
        <Col md={6}>
          <h5 className="mb-3">Rate this book</h5>
          {message && (
            <Alert variant={reviewed ? "success" : "warning"}>{message}</Alert>
          )}
          <Form onSubmit={handleRatingSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email (one rating per email):</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Rating:</Form.Label>
              <div className="mb-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    style={{
                      fontSize: "1.5rem",
                      cursor: reviewed ? "not-allowed" : "pointer",
                      color: num <= rating ? "#ffc107" : "#e4e5e9",
                    }}
                    onClick={() => !reviewed && setRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review Description (optional):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={reviewed}>
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          {reviews.length > 0 && (
            <>
              <h5 className="mb-3">User Reviews</h5>
              {reviews.map((r, index) => (
                <div key={index} className="border rounded p-3 mb-3 bg-light">
                  <strong>{r.email}</strong> ({r.date})
                  <div className="mb-2">{renderStars(r.rating)}</div>
                  {r.description && <p>{r.description}</p>}
                </div>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetail;
