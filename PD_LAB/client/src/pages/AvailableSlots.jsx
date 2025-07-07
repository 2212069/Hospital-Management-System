import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AvailableSlots = () => {
  const { doctorID } = useParams();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const patientID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchSlots = async () => {
      const token = localStorage.getItem("token");
      if (!patientID || !token) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
            `http://localhost:5000/patient/${patientID}/doctor/${doctorID}/available-slots`,
            {
              method: "GET",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },              
            }
          ); 

        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.clear();
            navigate("/login");
            return;
          }
          setError(data.error || "Error fetching slots");
        } else {
            setAvailableSlots(data.availableSlots || []);
        }
      } catch (error) {
        setError("Something went wrong while fetching slots.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [doctorID, navigate, patientID]);
  
  

  const bookAppointment = async (availabilityID) => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/book_appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientID, availabilityID }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        setAvailableSlots((prevSlots) =>
          prevSlots.filter((slot) => slot.availabilityID !== availabilityID)
        );
      } else {
        alert(data.error || "Failed to book appointment.");
      }
    } catch (error) {
      alert("Something went wrong while booking the appointment.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Slots</h2>

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>

      {availableSlots.length > 0 ? (
        <div style={styles.slotsContainer}>
          {availableSlots.map((slot) => (
            <button
              key={slot.availabilityID}
              onClick={() => bookAppointment(slot.availabilityID)}
              style={styles.slotButton}
            >
              {slot.day_of_week} | {slot.start_time} - {slot.end_time}
            </button>
          ))}
        </div>
      ) : (
        <p>No available slots found.</p>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", padding: "20px" },
  title: { textAlign: "center", color: "#333" },
  loading: { textAlign: "center", color: "blue" },
  error: { textAlign: "center", color: "red" },
  backButton: { padding: "8px 12px", marginBottom: "10px", backgroundColor: "#ff4d4d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  slotsContainer: { marginTop: "10px" },
  slotButton: { display: "block", width: "100%", padding: "8px", marginTop: "5px", backgroundColor: "#28A745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default AvailableSlots;
