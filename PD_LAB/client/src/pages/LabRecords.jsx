import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const LabRecords = () => {
  const [labRecords, setLabRecords] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:5000/api/labrecords/${userID}`)
        .then((res) => setLabRecords(res.data))
        .catch((err) => console.error("Error fetching lab records:", err));
    }
  }, [userID]);

  const openReportInNewTab = (record) => {
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`
      <html>
      <head><title>${record.testName} - Report</title></head>
      <body>
        <h2>${record.testName}</h2>
        <p><strong>Result:</strong> ${record.testResult}</p>
        <p><strong>Doctor:</strong> ${record.doctorName}</p>
        <p><strong>Patient:</strong> ${record.patientName}</p>
        <p><strong>Date:</strong> ${record.testDate}</p>
        <p><strong>Notes:</strong> ${record.doctorNotes}</p>
      </body>
      </html>
    `);
    reportWindow.document.close();
  };

  const downloadPDF = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Lab Report", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Test Name: ${record.testName}`, 10, 40);
    doc.text(`Result: ${record.testResult}`, 10, 50);
    doc.text(`Doctor: ${record.doctorName}`, 10, 60);
    doc.text(`Patient: ${record.patientName}`, 10, 70);
    doc.text(`Date: ${record.testDate}`, 10, 80);
    doc.text(`Notes: ${record.doctorNotes}`, 10, 90);
    doc.save(`${record.testName}_Report.pdf`);
  };

  return (
    <div>
      <Header />
      <div style={styles.mainContainer}>
        <Sidebar />
        <div style={styles.content}>
          <h2 style={styles.heading}>Lab Records</h2>
          <div style={styles.gridContainer}>
            {labRecords.map((record) => (
              <div key={record.testName} style={styles.card}>
                <h3 style={styles.cardTitle}>{record.testName}</h3>
                <p style={styles.cardDate}>{record.testDate}</p>
                <button style={styles.viewButton} onClick={() => openReportInNewTab(record)}>View Details</button>
                <button style={styles.downloadButton} onClick={() => downloadPDF(record)}>Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: { 
    display: "flex", 
    height: "100vh" 
  },
  content: { 
    flex: 1, 
    padding: "20px", 
    backgroundColor: "#f4f4f4", 
    overflowY: "auto" 
  },
  heading: { 
    fontSize: "24px", 
    fontWeight: "bold", 
    marginBottom: "20px", 
    textAlign: "center", 
    color: "#333" 
  },
  gridContainer: { 
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
    gap: "20px" 
  },
  card: { 
    backgroundColor: "#fff", 
    padding: "20px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
    textAlign: "center" 
  },
  cardTitle: { 
    fontSize: "18px", 
    fontWeight: "bold", 
    color: "#333" 
  },
  cardDate: { 
    fontSize: "14px", 
    color: "#777", 
    marginBottom: "10px"
  },
  viewButton: { 
    marginRight: "10px", 
    padding: "8px 12px", 
    backgroundColor: "#007BFF", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
  downloadButton: { 
    padding: "8px 12px", 
    backgroundColor: "#28a745", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  }
};

export default LabRecords;
