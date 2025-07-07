const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify token and restrict access based on role
exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// Role-based access middleware
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ message: "Unauthorized Access" });
        }
        next();
    };
};
