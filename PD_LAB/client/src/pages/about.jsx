import React from "react";
import Header from "../components/Header";

const About = () => {
  return (
    <div style={styles.container}>
      <Header />
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>About Aruna Cardiac Care</h1>
        <p style={styles.heroText}>
          Aruna Cardiac Care is a renowned hospital located at  
          <strong> 3B, Trivandrum Road, Kailash Nagar, Vannarpettai, Tirunelveli, Tamil Nadu 627003.</strong>
        </p>
        <p style={styles.heroText}>
          We specialize in <strong>Cardiology, Orthopedics, ENT, and Pediatric Cardiology</strong>.  
          Our facility operates <strong>24/7</strong> to ensure quality healthcare for all.
        </p>
        <p style={styles.contact}>
          <strong>Contact us:</strong>  
          <span> +91 93429 61454 </span>
        </p>
      </section>

      <section style={styles.videoSection}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7cfkKkCLL5w"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div style={styles.videoText}>
          <h2>Choosing the Right Healthcare</h2>
          <p>
            At Aruna Cardiac Care, we believe in providing the best medical services with top-notch expertise. Our team of specialists ensures the best treatment with a patient-centric approach.
          </p>
        </div>
      </section>

      <section style={styles.gridSection}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Experienced Specialists</h3>
            <p>Our doctors are highly qualified with years of expertise in their fields.</p>
          </div>
          <div style={styles.card}>
            <h3>Advanced Facilities</h3>
            <p>We use cutting-edge technology and modern equipment for treatments.</p>
          </div>
          <div style={styles.card}>
            <h3>Patient-Centric Care</h3>
            <p>Personalized treatment plans tailored to each patient's needs.</p>
          </div>
          <div style={styles.card}>
            <h3>24/7 Emergency Services</h3>
            <p>We are available round the clock for any medical emergencies.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f5f7fa",
  },
  hero: {
    background: "rgb(19, 68, 117)", 
    color: "white",
    
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease-in-out",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "15px",
    background: "linear-gradient(45deg, #FFD700, #FF6347)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  heroText: {
    fontSize: "18px",
    marginBottom: "15px",
    maxWidth: "800px",
    margin: "0 auto",
    color: "#fff",
    opacity: "0.9",
  },
  contact: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ffdd57",
    marginTop: "20px",
    textShadow: "0 0 10px rgba(255, 221, 87, 0.8)",
    transition: "transform 0.3s ease-in-out",
  },
  videoSection: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  videoText: {
    flex: "1",
    fontSize: "18px",
    maxWidth: "500px",
  },
  gridSection: {
    marginTop: "40px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default About;