import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div style={homeContainerStyles}>
      <Header />
      <div style={contentStyles}>
        <h2 style={{ color: "#fff", fontSize: "3em", marginBottom: "20px" }}>Welcome to Aruna Cardiac Care</h2>
        <p style={{ color: "#fff", fontSize: "1.5em", maxWidth: "600px", margin: "0 auto" }}>
          Your health, our priority. We specialize in providing the best cardiac care.
        </p>
      </div>
      <footer style={{
        background: "rgb(19, 68, 117)",
        padding: "30px",
        color: "white",
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <p style={{ margin: 0, fontSize: "1.2em", color: "#ccc" }}>
            Aruna Cardiac Care is committed to providing exceptional care to our patients. Our team of experts specializes
            in treating heart diseases and conditions with the latest technology and compassionate care.
          </p>
          <p style={{ fontSize: "1em", color: "#bbb" }}>&copy; 2025 Aruna Cardiac Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Styles
const homeContainerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
};

const contentStyles = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "40px",
  background: "rgba(0, 0, 0, 0.508)",
};

export default Home;
