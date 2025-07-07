import React from "react";
import Header from "../components/Header";

const Contact = () => {
  return (
    <div>
        <Header/>
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.subtitle}>We are here to assist you. Fill in the details below.</p>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} required />
          <input type="email" placeholder="Your Email" style={styles.input} required />
          <input type="tel" placeholder="Your Phone Number" style={styles.input} required />
          <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>

        <a href="tel:+918248183856" style={styles.sosButton}>
          SOS - Call Now
        </a>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Our Location</h2>
        <p style={styles.subtitle}>Visit us at Arunac Cardiac Care, Vannarpettai, Tirunelveli.</p>
        <div style={styles.mapContainer}>
          <iframe
            title="Arunac Cardiac Care Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6635751494137!2d77.70389027417736!3d8.730595993654487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b042606a5c6f63f%3A0x3ed31249a6334e5d!2sArunac%20Cardiac%20Care!5e0!3m2!1sen!2sin!4v1708364933207!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    height:"730px",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "40px",
    padding: "50px",
    backgroundColor: "rgb(19, 68, 117)",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    flex: "1",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    minWidth: "400px",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    color: "rgb(19, 68, 117)",
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    color: "#444",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "rgb(19, 68, 117)",
    color: "#fff",
    padding: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
  },
  sosButton: {
    display: "block",
    backgroundColor: "red",
    color: "#fff",
    padding: "14px",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    marginTop: "20px",
  },
  mapContainer: {
    flex: "1",
    borderRadius: "10px",
    overflow: "hidden",
    height: "100%",
  },
};

export default Contact;
