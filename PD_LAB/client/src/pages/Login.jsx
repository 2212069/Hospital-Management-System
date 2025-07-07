import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("patientID", formData.patientID);
      localStorage.setItem("userID", formData.userID);

      if (response.data.userType === "Patient") {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <h2 style={styles.heading}>Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="userID"
              placeholder="User ID"
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
          <p style={styles.registerText}>
            Don't have an account?  
            <span 
              onClick={() => navigate("/register")} 
              style={styles.registerLink}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  loginBox: {
    width: "350px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "rgb(19, 68, 117)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  registerLink: {
    marginLeft: "5px",
    color: "rgb(19, 68, 117)",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default Login;
