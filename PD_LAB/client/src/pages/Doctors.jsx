import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("No token found! Redirecting to login.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/patient/doctors", {
      method: "GET",
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response Status:", response.status); 
        if (response.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Doctors data received:", data);
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
        } else {
          console.warn("No doctors found in the response.");
          setDoctors([]); // Ensure empty state is handled
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, []);

  return (
    <div className="doctors-container">
      <h2>Available Doctors</h2>

      {loading ? (
        <p>Loading doctors...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : doctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        <ul className="doctors-list">
          {doctors.map((doctor) => (
            <li key={doctor.userID} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.speciality}</p>
              <p><strong>Email:</strong> {doctor.emailID}</p>
              <p><strong>Phone:</strong> {doctor.phoneNumber || "Not Available"}</p>
              <button onClick={() => navigate(`/patient/doctor/${doctor.userID}`)}>
                View Available Slots
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Doctors;
