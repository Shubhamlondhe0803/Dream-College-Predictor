import React, { useState, useEffect } from "react";
import { Users, Settings, LogOut, Home, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

function AdminPanel() {
  const [active, setActive] = useState("dashboard");
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  const stats = {
    users: 125,
    colleges: colleges.length, 
    activities: 87,
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    if (active === "colleges") {
      fetch("http://localhost:8080/api/college/")
        .then((res) => res.json())
        .then((data) => setColleges(data))
        .catch((err) => console.error("Error fetching colleges:", err));
    }
  }, [active]);

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className="dashboard-grid">
            <div className="card blue">
              <h3>👥 Users</h3>
              <p>{stats.users}</p>
            </div>
            <div className="card green">
              <h3>🏫 Colleges</h3>
              <p>{stats.colleges}</p>
            </div>
            <div className="card yellow">
              <h3>⚡ Activities</h3>
              <p>{stats.activities}</p>
            </div>
            <button
              onClick={() => navigate("/History")}
              className="card purple"
            >
              📜 History
            </button>
          </div>
        );

      case "colleges":
        return (
          <div>
            <h2>🏫 Total Colleges: {colleges.length}</h2>
            <table className="college-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>College Name</th>
                  <th>Region</th>
                  <th>Departments</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college, index) => (
                  <tr key={college.id || index}>
                    <td>{index + 1}</td>
                    <td>{college.collegeName}</td>
                    <td>{college.region}</td>
                    <td>
                      {college.department?.length > 0
                        ? college.department.map((dept) => dept.title).join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "students":
        return <h2>🎓 Manage Students</h2>;

      case "settings":
        return <h2>⚙️ Settings</h2>;

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">Admin Panel</h1>
        <nav>
          <button
            className={active === "dashboard" ? "active" : ""}
            onClick={() => setActive("dashboard")}
          >
            <Home size={18} /> Dashboard
          </button>
          <button
            className={active === "colleges" ? "active" : ""}
            onClick={() => setActive("colleges")}
          >
            <BookOpen size={18} /> Colleges
          </button>
          <button
            className={active === "students" ? "active" : ""}
            onClick={() => setActive("students")}
          >
            <Users size={18} /> Students
          </button>
          <button
            className={active === "settings" ? "active" : ""}
            onClick={() => setActive("settings")}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <h2>Welcome, Admin 👋</h2>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="content-box">{renderContent()}</div>
      </main>
    </div>
  );
}

export default AdminPanel;
