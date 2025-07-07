import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const patientID = localStorage.getItem("userID");

  useEffect(() => {
    if (patientID) {
      axios
        .get(`http://localhost:5000/patient/appointments/${patientID}`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          setError("Failed to fetch appointments.");
          setLoading(false);
        });
    }
  }, [patientID]);

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.mainContainer}>
        <Sidebar />
        <div style={styles.content}>
          <h3 style={styles.heading}>Appointment Details</h3>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Doctor Name</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt.appointmentID} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td>{appt.appointmentID}</td>
                    <td>{appt.doctorName}</td>
                    <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                    <td>{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
};

export default PatientAppointments;
