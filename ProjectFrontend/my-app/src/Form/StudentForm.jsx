import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentForm.css";

function StudentForm() {
  const [formData, setFormData] = useState({
    cetMarks: "",
    caste: "",
    region: "",
    department: "",
  });

  const [regions, setRegions] = useState([]); // store regions from API
  const [department, setDepartment] = useState([]);
  const [caste, setCaste] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaste = async () => {    
      try {
        const response = await fetch("http://localhost:8080/api/college/caste");
        if (response.ok) {
          const data = await response.json();
          setCaste(data); // set caste list
        } else {
          toast.error("Failed to fetch caste", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching caste:", error);
        toast.error("Server error fetching caste", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    fetchCaste();
    // Check if user is logged in 
  }, []);

  // Fetch departments from backend when component loads
  useEffect(() => {  

    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/college/departments");
        if (response.ok) {
          const data = await response.json();
          setDepartment(data); // set departments list
        } else {
          toast.error("Failed to fetch departments", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Server error fetching departments", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    fetchDepartments();   
   }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/college/region");
        if (response.ok) {
          const data = await response.json();
          setRegions(data); // set regions list
        } else {
          toast.error("Failed to fetch regions", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
        toast.error("Server error fetching regions", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams({
        region: formData.region,
        department: formData.department,
        caste: formData.caste,
        cetMark: formData.cetMarks,
      });

      const response = await fetch(
        `http://localhost:8080/api/college/filter?${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Filtered colleges:", data);

        if (data.length > 0) {
          toast.success("College found", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.warn("No colleges found for given criteria.", {
            position: "top-center",
            autoClose: 2000,
          });
        }

        navigate("/results", { state: { colleges: data } });

        // setFormData({
        //   cetMarks: "",
        //   caste: "",
        //   region: "",
        //   department: "",
        // });
      } else {
        toast.error("Failed to fetch colleges. Try again!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Server error. Please try again!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3 className="header">Student Information Form</h3>

        <div className="form-row">
          <div className="form-group">
            <label>CET Marks*</label>
            <input
              type="number"
              name="cetMarks"
              value={formData.cetMarks}
              onChange={handleChange}
              required
            />
          </div>
           <div className="form-group">
            <label>Caste*</label>
            <select
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              required
            >
              <option value="">Select Caste</option>
              {caste.map((caste, index) => (
                <option key={index} value={caste}>
                  {caste}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Region*</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Select Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Engineering Department*</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {department.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default StudentForm;
