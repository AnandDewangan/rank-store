import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Plus, Minus, Trash2 } from "lucide-react";
import "../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncrement = (bookId) => {
    const item = cartItems.find((item) => item._id === bookId);
    updateQuantity(bookId, item.quantity + 1);
  };

  const handleDecrement = (bookId) => {
    const item = cartItems.find((item) => item._id === bookId);
    if (item.quantity > 1) updateQuantity(bookId, item.quantity - 1);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.rankMrp || item.paperMrp),
    0
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-primary">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <Row>
          {cartItems.map((item) => (
            <Col md={12} key={item._id} className="mb-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border rounded-4 p-3 shadow-sm bg-white gap-3 cart-item">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="rounded-3"
                  style={{ height: "120px", width: "auto", objectFit: "cover" }}
                />
                <div className="flex-grow-1 px-md-3 text-center text-md-start">
                  <h5 className="fw-semibold mb-1">{item.title}</h5>
                  <p className="text-muted mb-1">{item.author}</p>
                  <p className="text-success fw-semibold mb-0">
                    ₹ {item.rankMrp || item.paperMrp}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDecrement(item._id)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="fw-semibold px-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleIncrement(item._id)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    removeFromCart(item._id);
                    toast.error("Remove from Cart");
                  }}
                  className="d-flex align-items-center gap-1"
                >
                  <Trash2 size={16} />{" "}
                  <span className="d-none d-md-inline">Remove</span>
                </Button>
              </div>
            </Col>
          ))}

          <Col md={12} className="mt-4 text-center">
            <h4 className="fw-bold mb-3">Total: ₹ {totalPrice.toFixed(2)}</h4>
            <Button
              variant="success"
              size="lg"
              className="px-4 py-2 rounded-pill"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
