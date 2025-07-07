import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [medications, setMedications] = useState([]);
  const patientID = localStorage.getItem("userID");

  useEffect(() => {
    if (patientID) {
      axios
        .get(`http://localhost:5000/api/prescriptions/${patientID}`)
        .then((res) => setPrescriptions(res.data))
        .catch((err) => console.error("Error fetching prescriptions:", err));
    }
  }, [patientID]);

  const loadMedications = (prescription) => {
    setSelectedPrescription(prescription);
    axios
      .get(`http://localhost:5000/api/medications/${prescription.prescriptionID}`)
      .then((res) => setMedications(res.data))
      .catch((err) => console.error("Error fetching medications:", err));
  };

  return (
    <div>
    <Header/>
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Prescriptions</h2>

        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div key={prescription.prescriptionID}>
              <h3 style={styles.date}>{new Date(prescription.createdAt).toLocaleDateString()}</h3>
              <div style={styles.card} onClick={() => loadMedications(prescription)}>
                <h3>{prescription.diagnosis}</h3>
                <p><strong>Doctor:</strong> {prescription.doctorID}</p>
                <p><strong>Instructions:</strong> {prescription.instructions}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}

        {selectedPrescription && (
          <div style={styles.detailsContainer}>
            <h3>Prescription Details</h3>
            <p><strong>Diagnosis:</strong> {selectedPrescription.diagnosis}</p>
            <p><strong>Doctor:</strong> {selectedPrescription.doctorID}</p>
            <p><strong>Instructions:</strong> {selectedPrescription.instructions}</p>

            {medications.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Dosage</th>
                    <th style={styles.th}>Before Food</th>
                    <th style={styles.th}>After Food</th>
                    <th style={styles.th}>Morning</th>
                    <th style={styles.th}>Afternoon</th>
                    <th style={styles.th}>Evening</th>
                    <th style={styles.th}>Night</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med) => (
                    <tr key={med.medicationID}>
                      <td style={styles.td}>{med.name}</td>
                      <td style={styles.td}>{med.dosage}</td>
                      <td style={styles.td}>{med.before_food ? "✔" : "✖"}</td>
                      <td style={styles.td}>{med.after_food ? "✔" : "✖"}</td>
                      <td style={styles.td}>{med.morning ? "✔" : "✖"}</td>
                      <td style={styles.td}>{med.afternoon ? "✔" : "✖"}</td>
                      <td style={styles.td}>{med.evening ? "✔" : "✖"}</td>
                      <td style={styles.td}>{med.night ? "✔" : "✖"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No medications found.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: { flex: 1, padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" },
  heading: { fontSize: "26px", fontWeight: "bold", textAlign: "center", color: "#333" },
  date: { fontSize: "18px", fontWeight: "bold", color: "#007BFF" },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    marginBottom: "10px",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", marginTop: "10px" },
  th: { padding: "10px", border: "1px solid #ddd", backgroundColor: "#007BFF", color: "white" },
  td: { padding: "10px", border: "1px solid #ddd", textAlign: "center" },
};

export default PrescriptionPage;
