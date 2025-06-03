import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "./logo192.png";

const ThankYouPage = () => {
  const { state } = useLocation();
  const { formData = {}, cartItems = [], paymentId = "" } = state || {};
  const receiptRef = useRef();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.rankMrp || item.paperMrp),
    0
  );

  const downloadReceipt = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("receipt.pdf");
  };

  return (
    <Container className="my-5">
      <h3 className="text-success text-center">🎉 Thank You for Your Purchase!</h3>
      <p className="text-center">
        Payment successful. Your payment ID is <strong>{paymentId}</strong>.
      </p>

      <div
        ref={receiptRef}
        className="p-4 mt-4 border rounded shadow-sm bg-white"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <Row>
          <Col md={6}>
            <h5><img src={logo} width={50}/>Rank Publishing House Store</h5>
            <p>Address: Bahartarai Chowk, Sarkanda <br />Bilaspur (Chhattisgarh), Pin - 495001</p>
            <p>Email: <a href="mailto:books@rankpublishinghouse.online">books@rankpublishinghouse.online</a></p>
            <p>Website: <a href="https://www.rankpublishinghouse.store">www.rankpublishinghouse.store</a></p>
            <p>Payment ID: <b>{paymentId}</b></p>
          </Col>
          <Col md={6} className="text-md-end">
            <h6>🧾 Invoice</h6>
            <p><strong>Invoice No:</strong> #{Math.floor(Math.random() * 900000 + 100000)}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Customer:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.contact}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.pincode}</p>
          </Col>
        </Row>

        <hr />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.rankMrp || item.paperMrp}</td>
                <td>{item.quantity * (item.rankMrp || item.paperMrp)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end"><strong>Grand Total</strong></td>
              <td><strong>₹{totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </Table>

        <div className="mt-3 text-muted text-center" style={{ fontSize: "0.9rem" }}>
          <em>This is an auto-generated receipt. No signature is required.</em>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button onClick={downloadReceipt} variant="primary">
          📥 Download Receipt
        </Button>
      </div>
    </Container>
  );
};

export default ThankYouPage;
