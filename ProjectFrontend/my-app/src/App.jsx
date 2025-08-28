import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import Dashboard from "./Dashboard/dashboard";
import StudentForm from "./Form/StudentForm";
import History from "./components/History";
import ResultsPage from "./Form/ResultPage";
import AdminPanel from "./Dashboard/AdminPanel"; 
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/form" element={isLoggedIn ? <StudentForm /> : <Navigate to="/login" />} />
        <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/login" />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminPanel />} /> 
      </Routes>
    </Router>
  );
}

export default App;
