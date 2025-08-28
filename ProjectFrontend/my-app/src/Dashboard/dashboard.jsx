import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const user = {
    name: storedUser.name || "Student",
    email: storedUser.email || "No Email",
    photo: storedUser.photo || "https://via.placeholder.com/150",
  };

  // Save activity in history
  const saveHistory = (action) => {
    const history = JSON.parse(localStorage.getItem("studentHistory")) || [];
    const entry = {
      action,
      user: { name: user.name, email: user.email },
      timestamp: new Date().toLocaleString(),
    };
    history.push(entry);
    localStorage.setItem("studentHistory", JSON.stringify(history));
  };

  // Save login history only once per session
  useEffect(() => {
    const alreadyLogged = localStorage.getItem("loginLogged");
    if (!alreadyLogged) {
      saveHistory("Login");
      localStorage.setItem("loginLogged", "true");
    }
  });

  // Logout function
  const handleLogout = () => {
    saveHistory("Logout");

    // Keep user profile but mark logged out
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("loginLogged");

    toast.info("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2200);
  };

  // Handle clicking on photo
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  // Handle uploading new photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUser = { ...user, photo: reader.result };
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        saveHistory("Profile Photo Updated");
        window.location.reload(); // refresh to show new photo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormClick = () => {
    saveHistory("Opened Form");
    navigate("/form");
  };

  return (
    <main className="dashboard-main">
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar glass">
          <div className="user-section">
            <h3 className="welcome-text">
              Welcome, <span className="username-text">{user.name}</span> 🎉
            </h3>

            <div className="profile-wrapper">
              <img
                src={user.photo}
                alt="User"
                className="user-photo"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && (
                <div className="user-menu glass">
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <p className="user-email">{user.email}</p>
                  <button className="upload-btn" onClick={handlePhotoClick}>
                    Change Photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="menu-buttons">
            <button onClick={handleFormClick} className="search-btn">
              🏫 Search College
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Background Section */}
        <div className="bgimg">
          <h1 className="dashboard-title">🎓 Student Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage your profile, search colleges, and track your activity.
          </p>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
}

export default Dashboard;
