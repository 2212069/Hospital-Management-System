// Sidebar.js (Create this new file inside components folder)
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "rgb(19, 68, 117)",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Patient Dashboard</h2>
      <button onClick={() => navigate("/patient/profile")} style={buttonStyle}>
        Profile
      </button>
      <button onClick={() => navigate("/patient/book-appointment")} style={buttonStyle}>
        Book Appointment
      </button>
      <button onClick={() => navigate("/patient/view-prescriptions")} style={buttonStyle}>
        View Prescriptions
      </button>
      <button onClick={() => navigate("/patient/lab-reports")} style={buttonStyle}>
        Lab Reports
      </button>
      <button onClick={() => navigate("/patient/appointments")} style={buttonStyle}>
        My Appointments
      </button>
      <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: "#E74C3C" }}>
        Logout
      </button>
    </div>
  );
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  backgroundColor: "#3498DB",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Sidebar;
