import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/register");
      return;
    }

    axios
      .get(`${baseURL}/api/books/purchased/${user._id}`)
      .then((res) => setPurchasedBooks(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${baseURL}/api/books`)
      .then((res) => setAllBooks(res.data))
      .catch((err) => console.error(err));
  }, [user, navigate]);

  const handlePurchase = (book) => {
    if (!user) {
      toast.error("Please login to purchase.");
      navigate("/register");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: Number(book.rankMrp) * 100,
      currency: "INR",
      name: "Rank Publishing House",
      description: `Purchase Book: ${book.title}`,
      handler: function (response) {
        axios
          .post(`${baseURL}/api/books/purchase`, {
            userId: user._id,
            bookId: book._id,
            paymentId: response.razorpay_payment_id,
          })
          .then(() => {
            toast.success("Purchase successful!");
            return axios.get(`${baseURL}/api/books/purchased/${user._id}`);
          })
          .then((res) => setPurchasedBooks(res.data))
          .catch(() => {
            toast.error("Error recording purchase.");
          });
      },
      prefill: {
        name: user.name,
        email: user.email || "",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Filter + Search logic
  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory =
      selectedCategory === "" || book.cat === selectedCategory;
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  if (!user) return null;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Welcome, {user.name}</h2>
        </div>
        <div className="col-md-6 text-end my-auto">
          <strong>Username:</strong> {user.username}
        </div>
      </div>

      <hr />

      <h3>📚 Your Purchased Books</h3>
      {purchasedBooks.length > 0 ? (
        <div className="carousel d-flex overflow-auto gap-3 p-2">
          {purchasedBooks.map((book) => (
            <div
              key={book._id}
              className="card"
              style={{ minWidth: "200px", maxWidth: "220px" }}
            >
              <Link to={`/book/${book._id}`} style={{ textDecoration: "none" }}>
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="card-img-top p-2 bg-white"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              </Link>
              <div className="card-body">
                <h6 className="card-title">{book.title}</h6>
                <p className="text-success fw-bold">₹ {book.rankMrp}</p>
                <Link
                  to={`/book/${book._id}`}
                  className="btn btn-primary btn-sm w-100"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not purchased any books yet.</p>
      )}

      <hr />

      <h3>📖 All Available Books</h3>

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
          </select>
        </div>
      </div>

      <div className="row">
        {visibleBooks.length > 0 ? (
          visibleBooks.map((book) => {
            const alreadyPurchased = purchasedBooks.some(
              (b) => b._id === book._id
            );
            return (
              <div key={book._id} className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm">
                  <Link
                    to={`/books/${book._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="card-img-top p-2 bg-white"
                      style={{
                        height: "250px",
                        objectFit: "contain",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{book.title}</h6>
                    <p className="text-success fw-bold">
                      ₹ {book.eBookMrp || "N/A"}
                    </p>
                    <button
                      className="btn btn-success w-100 mt-auto"
                      disabled={alreadyPurchased}
                      onClick={() => handlePurchase(book)}
                    >
                      {alreadyPurchased ? "Purchased" : "Buy Now"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>

      {visibleCount < filteredBooks.length && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setVisibleCount(visibleCount + 20)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
