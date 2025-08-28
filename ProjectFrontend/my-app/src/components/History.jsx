import React, { useEffect, useState } from "react";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("studentHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="history-container">
      <h2>User Activity History</h2>
      {history.length === 0 ? (
        <p className="no-history">No history found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Activity</th>
              <th>User</th>
              <th>Email</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.action}</td>
                <td>{item.user?.name || "-"}</td>
                <td>{item.user?.email || "-"}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
