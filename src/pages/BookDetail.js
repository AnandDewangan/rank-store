import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import "../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    axios
      .get(`${baseURL}/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${baseURL}/api/books/${id}/reviews`)
      .then((res) => {
        setReviews(res.data);
        if (res.data.length) {
          const avg =
            res.data.reduce((sum, r) => sum + r.rating, 0) / res.data.length;
          setAverageRating(avg.toFixed(1));
          setReviewCount(res.data.length);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/books/${id}/reviews`, {
        email,
        rating,
        description: reviewDescription,
      });

      toast.success("Thanks for your rating!");
      setReviewed(true);

      // Refresh reviews
      const updatedReviews = await axios.get(
        `${baseURL}/api/books/${id}/reviews`
      );
      setReviews(updatedReviews.data);
      if (updatedReviews.data.length) {
        const avg =
          updatedReviews.data.reduce((sum, r) => sum + r.rating, 0) /
          updatedReviews.data.length;
        setAverageRating(avg.toFixed(1));
        setReviewCount(updatedReviews.data.length);
      }
    } catch (err) {
      toast.danger(err);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...book, quantity: 1 });
    toast.success("Book added to cart!");
  };

  const handleBuyEbook = () => {
    const amount = Number(book.eBookMrp) * 100;

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your real Razorpay key
      amount,
      currency: "INR",
      name: "Rank Publishing",
      description: `Buy eBook: ${book.title}`,
      handler: function (response) {
        // Record the purchase
        axios.post(`${baseURL}/api/books/purchase`, {
          userId: user._id,
          bookId: book._id,
          paymentId: response.razorpay_payment_id,
        })
          .then(() => {
            toast.success("eBook purchase successful!");
            navigate("/dashboard");
          })
          .catch(() => toast.error("Payment succeeded but saving failed"));
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
          {reviewCount > 0 && (
            <div className="mb-2">
              {renderStars(Math.round(averageRating))}
              <span className="ms-2 text-muted">({reviewCount} reviews)</span>
            </div>
          )}

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
                ₹ {user ? book.eBookMrp : book.rankMrp}
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
          <p>
            <strong>Category:</strong> {book.cat}
          </p>
          {book.description && (
            <p className="mt-3">
              <strong>Description:</strong> {book.description}
            </p>
          )}

          {user ? (
            <Button variant="primary" className="mt-3" onClick={handleBuyEbook}>
              Buy eBook
            </Button>
          ) : (
            <Button variant="danger" className="mt-3" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>

      <hr />

      <Row className="mt-4">
        <Col md={6}>
          <h5 className="mb-3">Rate this book</h5>
          <Form onSubmit={handleRatingSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
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
              <Form.Label>Review Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                required
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
              {reviews
                .slice(0, showAllReviews ? reviews.length : 3)
                .map((r, index) => (
                  <div key={index} className="border rounded p-3 mb-3 bg-light">
                    <strong>{r.email}</strong> (
                    {new Date(r.date).toLocaleDateString()})
                    <div className="mb-2">{renderStars(r.rating)}</div>
                    {r.description && <p>{r.description}</p>}
                  </div>
                ))}

              {reviews.length > 3 && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? "Show Less" : "View More"}
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetail;
