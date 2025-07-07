import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const patientID = localStorage.getItem("userID");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const containerStyle = {
    position: "relative",
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "130vh",
    display: "flex",
    flexDirection: "column",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dims the background (Adjust opacity if needed)
  };

  const contentStyle = {
    position: "relative",
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "white",
  };

  const dashboardContentStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <Header />
      <div style={contentStyle}>
        <Sidebar />
        <div style={dashboardContentStyle}>
          <h1>Welcome to Patient Dashboard!❤️</h1>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
