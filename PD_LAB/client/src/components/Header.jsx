import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/")
    window.location.reload();
  };

  return (
    <header style={headerStyles}>
      <h1 style={headerTitleStyles}>
        <img
          src="https://cdn0.iconfinder.com/data/icons/medical-health-set-2-glyph/33/cardiology-1024.png"
          alt="Cardiac Icon"
          style={{ width: "40px", height: "40px", marginRight: "10px", verticalAlign: "middle" }}
        />
        Aruna Cardiac Care
      </h1>
      <nav>
        <ul style={navListStyles}>
          <li style={navItemStyles}><Link to="/" style={navLinkStyles}>HOME</Link></li>
          <li style={navItemStyles}><Link to="/doctors" style={navLinkStyles}>ALLDOCTORS</Link></li>
          <li style={navItemStyles}><Link to="/about" style={navLinkStyles}>ABOUT</Link></li>
          <li style={navItemStyles}><Link to="/contact" style={navLinkStyles}>CONTACT</Link></li>
          <li>
            {isAuthenticated ? (
              <div style={{ position: "relative" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile Icon"
                  style={{ width: "40px", height: "40px", cursor: "pointer", borderRadius: "50%" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div style={dropdownStyles}>
                    <Link to="/profile" style={dropdownItemStyles}>Profile</Link>
                    <Link to="/settings" style={dropdownItemStyles}>Settings</Link>
                    <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" style={navLinkStyles}>LOGIN</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Styles
const headerStyles = {
  background: "rgb(19, 68, 117)",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  zIndex: 1,
};

const headerTitleStyles = {
  fontSize: "2.5em",
  margin: 0,
  color: "#fff",
  display: "flex",
  alignItems: "center",
};

const navListStyles = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
};

const navItemStyles = {
  marginRight: "20px",
};

const navLinkStyles = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.2em",
};

const dropdownStyles = {
  position: "absolute",
  right: 0,
  top: "50px",
  background: "white",
  color: "black",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  width: "150px",
  zIndex: 2,
};

const dropdownItemStyles = {
  display: "block",
  padding: "10px",
  textDecoration: "none",
  color: "black",
};

const logoutButtonStyles = {
  display: "block",
  width: "100%",
  background: "none",
  border: "none",
  textAlign: "left",
  padding: "10px",
  cursor: "pointer",
  color: "black",
};

export default Header;
