import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:5000/patient/profile/${userID}`)
        .then((res) => setPatient(res.data))
        .catch((err) => console.error("Error fetching patient data:", err));
    }
  }, [userID]);

  if (!patient) {
    return <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Loading patient profile...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Background dimming overlay */}
      <Header />
      <div style={{ display: "flex", position: "relative" }}>
        <Sidebar />
        <div style={styles.content}>
          <h2 style={styles.heading}>Patient Profile</h2>
          <div style={styles.card}>
            <div style={styles.profileHeader}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Patient"
                style={styles.profileImage}
              />
              <h3 style={styles.patientName}>{patient.name}</h3>
              <p style={styles.patientID}>Patient ID: {patient.userID}</p>
            </div>

            <div style={styles.infoContainer}>
              <div style={styles.infoRow}>
                <span style={styles.label}>Email:</span>
                <span style={styles.value}>{patient.emailID}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Phone:</span>
                <span style={styles.value}>{patient.phoneNumber}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Gender:</span>
                <span style={styles.value}>{patient.gender}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Date of Birth:</span>
                <span style={styles.value}>{patient.dateOfBirth}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Address:</span>
                <span style={styles.value}>{patient.address}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Chronic Conditions:</span>
                <span style={styles.value}>{patient.chronicConditions || "None"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dims the background
  },
  content: {
    position: "relative",
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "3px solid #007bff",
  },
  patientName: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#333",
  },
  patientID: {
    fontSize: "14px",
    color: "#666",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#222",
  },
};

export default PatientProfile;
