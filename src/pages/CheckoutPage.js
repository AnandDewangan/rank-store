import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    pincode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Rank Publishing House",
      description: "Order Payment",
      image: "/logo192.png",
      order_id: data.id,
      handler: async function (response) {
        // Store order to DB
        try {
          await fetch(`${baseURL}/api/payment/store-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData,
              cartItems,
              paymentId: response.razorpay_payment_id,
            }),
          });
        } catch (err) {
          console.error("Error saving order to DB", err);
        }

        clearCart();

        // Then navigate to Thank You page
        navigate("/thank-you", {
          state: {
            formData,
            cartItems,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v)) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${baseURL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: cartItems.reduce(
          (acc, item) => acc + item.quantity * (item.rankMrp || item.paperMrp),
          0
        ),
        currency: "INR",
      }),
    });

    const data = await res.json();
    if (!data.id) {
      toast.error("Failed to create Razorpay order");
      return;
    }

    loadRazorpay(data);
  };

  return (
    <Container className="my-5">
      <h3 className="text-primary mb-4">Checkout</h3>
      <Form onSubmit={handleCheckout}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control name="contact" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Address</Form.Label>
              <Form.Control name="address" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control name="pincode" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" size="lg">
          Pay with Razorpay
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
