import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Admin Login
    if (form.email === "admin@gmail.com" && form.password === "admin123456") {
      toast.success("Admin login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");

      setTimeout(() => {
        navigate("/admin");
      }, 2200);

      return;
    }

    // ✅ Student Login
    try {
      const response = await fetch("http://localhost:8080/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();

        if (data) {
          toast.success("Login successful!", {
            position: "top-center",
            autoClose: 2000,
          });

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", "student");
          localStorage.setItem("loggedInUser", JSON.stringify(data));

          // ✅ Save login history
          const history = JSON.parse(localStorage.getItem("studentHistory")) || [];
          history.push(`Logged in at ${new Date().toLocaleString()}`);
          localStorage.setItem("studentHistory", JSON.stringify(history));

          // ✅ Navigate to student dashboard (fixed)
          setTimeout(() => {
            navigate("/dashboard"); // 👈 update route here
          }, 2200);
        } else {
          toast.error("Invalid email or password", { position: "top-center" });
        }
      } else {
        toast.error("Invalid email or password", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Server error. Please try again!", { position: "top-center" });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email / Admin ID"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/">Create Account</a>
      </p>
      <p>
        Forgot Password? <a href="/">Click Here</a>
      </p>

      <ToastContainer />
    </div>
  );
}

export default Login;
