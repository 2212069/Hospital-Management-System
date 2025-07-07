import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/patient/doctors1", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            navigate("/login");
          } else {
            setError("Failed to fetch doctors.");
          }
          return;
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        setError("Something went wrong while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <Header />
      <div style={styles.mainContainer}>
        <Sidebar />
        <div style={styles.contentContainer}>
          <h2 style={styles.title}>Book an Appointment</h2>

          {loading && <p style={styles.loading}>Loading...</p>}
          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.doctorList}>
            <h3 style={styles.subtitle}>Available Doctors</h3>
            <ul style={styles.list}>
              {doctors.map((doctor) => (
                <li key={doctor.userID} style={styles.doctorItem}>
                  <img
                    src={doctor.photoURL || "https://via.placeholder.com/100"}
                    alt={doctor.name}
                    style={styles.doctorImage}
                  />
                  <div>
                    <h4 style={styles.doctorName}>{doctor.name}</h4>
                    <button
                      onClick={() => navigate(`/available-slots/${doctor.userID}`)}
                      style={styles.button}
                    >
                      View Slots
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
    zIndex: -1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop:"30px",
    padding: "10px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency for better visibility
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    textAlign: "center",
    color: "#444",
    fontSize: "20px",
    marginBottom: "15px",
  },
  loading: {
    textAlign: "center",
    color: "blue",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "18px",
  },
  doctorList: {
    marginTop: "20px",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  doctorItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "15px",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
  },
  doctorItemHover: {
    transform: "scale(1.02)",
  },
  doctorImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "3px solid #007BFF",
  },
  doctorName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default BookAppointment;
