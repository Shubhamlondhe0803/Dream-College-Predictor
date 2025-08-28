import React from "react";
import { useLocation } from "react-router-dom";
import "./Result.css";

function ResultsPage() {
  const location = useLocation();
  const colleges = location.state?.colleges || [];

  return (
    <div className="results-container">
      <h2 className="results-title">Your Colleges.. 👻</h2>
      {colleges.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>College Name</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td>{college.id}</td>
                <td>{college.collegeName}</td>
                <td>{college.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No colleges found matching your criteria.</p>
      )}
    </div>
  );
}

export default ResultsPage;
