require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "hms"
});

db.connect((err) => {
    if (err) console.log("❌ Database Connection Failed!", err);
    else console.log("✅ Database Connected!");
});

const generateUniqueUserID = async (prefix) => {
    let isUnique = false;
    let userID;
    
    while (!isUnique) {
        userID = `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;

        try {
            const [rows] = await db.promise().query(
                "SELECT userID FROM users WHERE userID = ?", 
                [userID]
            );

            if (rows.length === 0) {
                isUnique = true;
            }
        } catch (error) {
            console.error("Error checking unique userID:", error);
            throw new Error("Database error in generateUniqueUserID");
        }
    }
    return userID;
};


app.post("/register", async (req, res) => {
    console.log("Received Data:", req.body); 
    const { emailID, password, userType, name, phoneNumber, gender, address, speciality, photoURL } = req.body;

    db.query("SELECT * FROM users WHERE emailID = ?", [emailID], async (err, result) => {
        if (result.length > 0) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userID = await generateUniqueUserID(
            userType === "Doctor" ? "D" : userType === "Admin" ? "A" : "U"
        );        

        db.query("INSERT INTO users (userID, emailID, password, userType) VALUES (?, ?, ?, ?)",
            [userID, emailID, hashedPassword, userType], (err) => {
                if (err) return res.status(500).json({ error: err });

                if (userType === "Patient") {
                    db.query("INSERT INTO patient (userID, name, address, phoneNumber, gender, emailID) VALUES (?, ?, ?, ?, ?, ?)",
                        [userID, name, address, phoneNumber, gender, emailID], (err) => {
                            if (err) return res.status(500).json({ error: err });
                            res.status(201).json({ message: "Patient registered successfully", userID });
                        });
                } else if (userType === "Doctor") {
                    db.query("INSERT INTO doctors (userID, name, speciality, phoneNumber, photoURL,emailID) VALUES (?, ?, ?, ?, ?, ?)",
                        [userID, name, speciality, phoneNumber, photoURL, emailID], (err) => {
                            if (err) return res.status(500).json({ error: err });
                            res.status(201).json({ message: "Doctor registered successfully", userID });
                        });
                } else if (userType === "Admin") {
                    db.query("INSERT INTO admin (userID, name, email, password) VALUES (?, ?, ?, ?)",
                        [userID, name, emailID, hashedPassword], (err) => {  
                            if (err) return res.status(500).json({ error: err });
                            res.status(201).json({ message: "Admin registered successfully", userID });
                        });
                }
                else {
                    res.status(400).json({ message: "Invalid user type" });
                }
            });
    });
});

app.post("/login", (req, res) => {
    const { userID, password } = req.body;

    db.query("SELECT * FROM users WHERE userID = ?", [userID], async (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!result || result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userID: user.userID, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, userType: user.userType });
    });
});

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

app.get("/admin/dashboard", authenticate, (req, res) => {
    if (req.user.userType !== "Admin") return res.status(403).json({ message: "Unauthorized Access" });
    res.json({ message: "Welcome to Admin Dashboard!" });
});

app.get("/doctor/dashboard", authenticate, (req, res) => {
    if (req.user.userType !== "Doctor") return res.status(403).json({ message: "Unauthorized Access" });
    res.json({ message: "Welcome to Doctor Dashboard!" });
});

app.get("/patient/dashboard", authenticate, (req, res) => {
    if (req.user.userType !== "Patient") return res.status(403).json({ message: "Unauthorized Access" });
    res.json({ message: "Welcome to Patient Dashboard!" });
});


app.post("/admin/addDoctor", authenticate, async (req, res) => { 
    if (req.user.userType !== "Admin") {
        return res.status(403).json({ message: "Unauthorized Access" });
    }

    try {
        const { name, emailID, specialization, qualification, password } = req.body;

        const [existingUser] = await db.promise().query(
            "SELECT * FROM users WHERE emailID = ?", [emailID]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered. Please use a different email." });
        }

        const userID = await generateUniqueUserID("D");   
        const hashedPassword = await bcrypt.hash(password, 10); 

        await db.promise().query(
            "INSERT INTO users (userID, emailID, password, userType) VALUES (?, ?, ?, ?)", 
            [userID, emailID, hashedPassword, "Doctor"]
        );
 
        await db.promise().query(
            `INSERT INTO doctors 
             (userID, name, emailID, speciality, qualification, photoURL, phoneNumber, experience, 
              available_monday, available_tuesday, available_wednesday, available_thursday, available_friday, 
              available_saturday, available_sunday, slotDuration) 
             VALUES (?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`,
            [userID, name, emailID, specialization, qualification]
        );

        res.status(201).json({ message: "Doctor added successfully", userID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete("/admin/removeDoctor/:userID", authenticate, (req, res) => {
    if (req.user.userType !== "Admin") {
        return res.status(403).json({ message: "Unauthorized Access" });
    }

    const { userID } = req.params;

    db.query("DELETE FROM doctors WHERE userID = ?", [userID], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        db.query("DELETE FROM users WHERE userID = ?", [userID], (err) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ message: "Doctor removed successfully" });
        });
    });
});

app.get("/api/labrecords/:userID", (req, res) => {
    const { userID } = req.params; // ✅ Correct way to get userID from URL

    const sql = "SELECT * FROM labRecords WHERE userID = ?";
    db.query(sql, [userID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) {
            return res.status(404).json({ message: "No lab records found" });
        }
        res.json(result);
    });
});


app.post("/doctor/addPrescription", authenticate, async (req, res) => {
    try {
        if (req.user.userType !== "Doctor") {
            return res.status(403).json({ message: "Unauthorized Access" });
        }

        const { patientID, diagnosis, instructions, medications } = req.body; // Expecting an array of medications

        if (!patientID || !medications || medications.length === 0) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        db.query("SELECT * FROM patient WHERE userID = ?", [patientID], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.length === 0) {
                return res.status(404).json({ message: "Patient not found" });
            }

            db.query(
                "INSERT INTO prescriptions (patientID, doctorID, diagnosis, instructions) VALUES (?, ?, ?, ?)",
                [patientID, req.user.userID, diagnosis, instructions],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err });

                    const prescriptionID = result.insertId; 

                    const medicationValues = medications.map(med => [
                        prescriptionID,
                        med.name,
                        med.dosage,
                        med.before_food || false,
                        med.after_food || false,
                        med.morning || false,
                        med.afternoon || false,
                        med.evening || false,
                        med.night || false
                    ]);

                    const medicationQuery = `INSERT INTO medications 
                        (prescriptionID, name, dosage, before_food, after_food, morning, afternoon, evening, night) 
                        VALUES ?`;

                    db.query(medicationQuery, [medicationValues], (err) => {
                        if (err) return res.status(500).json({ error: err });
                        res.status(201).json({ message: "Prescription added successfully", prescriptionID });
                    });
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/patient/prescriptions", authenticate, (req, res) => {
    if (req.user.userType !== "Patient") {
        return res.status(403).json({ message: "Unauthorized Access" });
    }

    db.query(
        `SELECT p.prescriptionID, p.createdAt, d.name AS doctorName, 
                p.diagnosis, p.instructions, m.name AS medicationName, 
                m.dosage, m.before_food, m.after_food, 
                m.morning, m.afternoon, m.evening, m.night
         FROM prescriptions p
         JOIN doctors d ON p.doctorID = d.userID
         JOIN medications m ON p.prescriptionID = m.prescriptionID
         WHERE p.patientID = ?`,
        [req.user.userID], 
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
});

app.get("/patient/doctors1", (req, res) => {
    const query = "SELECT userID, name, speciality, emailID, photoURL, experience, qualification FROM doctors1";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log("Doctors data:", results); 
        res.json(results);
    });
});


app.post("/admin/setSlotDuration", authenticate, (req, res) => {
    if (req.user.userType !== "Admin") {
        return res.status(403).json({ message: "Unauthorized Access" });
    }

    const { slotDuration } = req.body;

    if (!slotDuration || slotDuration <= 0) {
        return res.status(400).json({ message: "Invalid slot duration" });
    }

    db.query("SELECT * FROM settings", (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length > 0) {
            db.query("UPDATE settings SET slotDuration = ?", [slotDuration], (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: "Slot duration updated successfully" });
            });
        } else {
            db.query("INSERT INTO settings (slotDuration) VALUES (?)", [slotDuration], (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: "Slot duration set successfully" });
            });
        }
    });
});

app.get("/admin/getSlotDuration", (req, res) => {
    db.query("SELECT slotDuration FROM settings LIMIT 1", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Slot duration not set" });
        res.json({ slotDuration: results[0].slotDuration });
    });
});

app.post("/doctor/setSlots", authenticate, async (req, res) => {
    try {
        if (req.user.userType !== "Doctor") {
            return res.status(403).json({ message: "Unauthorized Access" });
        }

        const { date, start_time, end_time } = req.body;

        if (!date || !start_time || !end_time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [globalSetting] = await db.promise().query("SELECT slotDuration FROM settings LIMIT 1");
        const duration = globalSetting[0]?.slot_duration || 15; 

        let currentTime = new Date(`${date}T${start_time}`);
        const endTime = new Date(`${date}T${end_time}`);

        const slotEntries = [];

        while (currentTime < endTime) {
            let nextSlot = new Date(currentTime);
            nextSlot.setMinutes(currentTime.getMinutes() + duration);

            if (nextSlot <= endTime) {
                slotEntries.push([req.user.userID, date, currentTime.toTimeString().slice(0, 8), nextSlot.toTimeString().slice(0, 8), true]);
            }

            currentTime = nextSlot;
        }

        if (slotEntries.length === 0) {
            return res.status(400).json({ message: "Invalid slot timing" });
        }

        const insertQuery = `
    INSERT INTO doctor_slots (doctorID, date, start_time, end_time, duration, is_available)
    VALUES ?`;

await db.promise().query(insertQuery, [slotEntries.map(slot => [...slot, duration])]);


        res.status(201).json({ message: "Slots added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
const verifyPatient = async (req, res, next) => {
    try {
        const token = req.header("Authorization"); // Get token from header

        if (!token) {
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        req.patient = decoded; // Attach patient info to request

        next(); // Move to next function
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
app.get("/patient/available-slots/:doctorID", async (req, res) => {
    const { doctorID } = req.params;
    try {
      const slots = await db.query("SELECT start_time,end_time FROM doctor_availability WHERE doctorID = ?", [doctorID]);
      res.json(slots.map(slot => slot.start_time));
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch slots" });
    }
  });

  app.get('/patient/:patientID/doctor/:doctorID/available-slots', verifyPatient, async (req, res) => {
    try {
        const { patientID, doctorID } = req.params;

        if (req.patient.userID !== patientID) {
            return res.status(403).json({ message: "Access denied. Unauthorized patient." });
        }

        const [[doctorExists]] = await db.promise().query(
            "SELECT userID FROM doctors1 WHERE userID = ?",
            [doctorID]
        );

        if (!doctorExists) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        const [slots] = await db.promise().query(
            "SELECT availabilityID, doctorID, start_time, end_time, day_of_week FROM doctor_availability WHERE doctorID = ? AND is_available = 1",
            [doctorID]
        );

        if (slots.length === 0) {
            return res.status(404).json({ message: "No available slots found for this doctor." });
        }

        res.json({ doctorID, availableSlots: slots || [] });

    } catch (error) {
        console.error("Error fetching available slots:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/patient/book_appointment", async (req, res) => {
    const { patientID, availabilityID } = req.body;
    console.log("Received request:", req.body);

    try {
        const [slotResults] = await db.promise().query(
            "SELECT doctorID FROM doctor_availability WHERE availabilityID = ? AND is_available = 1",
            [availabilityID]
        );

        if (slotResults.length === 0) {
            return res.status(400).json({ error: "Invalid or unavailable slot." });
        }

        const doctorID = slotResults[0].doctorID;
        console.log(doctorID);
        await db.promise().query(
            "INSERT INTO appointment1 (patientID, doctorID, slotID, appointment_date, status) VALUES (?, ?, ?, NOW(), 'Pending')",
            [patientID, doctorID, availabilityID]
        );        

        await db.promise().query(
            "Delete from doctor_availability where availabilityID=?",
            [availabilityID]
        );

        res.json({ message: "Appointment booked successfully!" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/patient/profile/:userID", (req, res) => {
    const { userID } = req.params;  // Extract userID from URL parameter

    const sql = "SELECT * FROM patient WHERE userID = ?";
    db.query(sql, [userID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(result[0]);  // Return the first matching patient record
    });
});
app.get("/patient/appointments/:patientID", (req, res) => {
    const { patientID } = req.params;
    const sql = `
      SELECT a.appointmentID, a.appointment_date, a.status, 
             d.name AS doctorName
      FROM appointment1 a
      JOIN doctors1 d ON a.doctorID = d.userID
      WHERE a.patientID = ? 
      ORDER BY a.appointment_date DESC
    `;
  
    db.query(sql, [patientID], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
  
      res.json(result);
    });
  });

  app.get("/api/prescriptions/:patientID", (req, res) => {
    const { patientID } = req.params;
    const query =`SELECT * FROM prescriptions WHERE patientID = ? ORDER BY createdAt DESC`;
    db.query(query, [patientID], (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  });
  
  app.get("/api/medications/:prescriptionID", (req, res) => {
    const { prescriptionID } = req.params;
    const query = `SELECT * FROM medications WHERE prescriptionID = ?`;
    db.query(query, [prescriptionID], (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  });

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
