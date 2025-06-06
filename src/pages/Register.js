import { useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="form-control mb-2" name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input className="form-control mb-2" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary w-100">Register</button>
        <p className="text-center mt-3">
          Already registered? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}
