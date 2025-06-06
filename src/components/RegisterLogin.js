import React, { useState } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const RegisterLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "", username: "", email: "", password: "", mobile: "", address: "", emailOrUsername: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { emailOrUsername: form.emailOrUsername, password: form.password } : form;

      const res = await axios.post(`${baseURL}${url}`, payload);
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard";
      } else {
        alert("Registered. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
            <input name="username" placeholder="Username" onChange={handleChange} className="form-control mb-2" />
            <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
            <input name="mobile" placeholder="Mobile" onChange={handleChange} className="form-control mb-2" />
            <input name="address" placeholder="Full Address" onChange={handleChange} className="form-control mb-2" />
          </>
        )}
        <input
          name={isLogin ? "emailOrUsername" : "password"}
          placeholder={isLogin ? "Email or Username" : "Password"}
          type="text"
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="form-control mb-3"
        />
        <button className="btn btn-primary w-100">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p className="mt-3">
        {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
        <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default RegisterLogin;
