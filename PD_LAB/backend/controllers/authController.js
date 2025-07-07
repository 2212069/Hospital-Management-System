const db = require("../db"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    const { emailID, password, userType } = req.body;

    db.query("SELECT * FROM users WHERE emailID = ?", [emailID], async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique userID (7 characters)
        const userID = `U${Math.floor(100000 + Math.random() * 900000)}`;

        // Insert into users table
        db.query("INSERT INTO users (userID, emailID, password, userType) VALUES (?, ?, ?, ?)", 
            [userID, emailID, hashedPassword, userType], 
            (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: "User registered successfully", userID });
            }
        );
    });
};

// User Login
exports.login = (req, res) => {
    const { emailID, password } = req.body;

    db.query("SELECT * FROM users WHERE emailID = ?", [emailID], async (err, result) => {
        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ userID: user.userID, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, userType: user.userType });
    });
};
