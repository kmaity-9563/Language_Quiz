// Navbar.jsx
import React from "react";

function Navbar({ onLanguageSelect }) {
  const buttonStyle = {
    backgroundColor: "#4CAF50", // Green color (you can customize)
    border: "none",
    color: "white",
    padding: "10px 15px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "4px", // Rounded corners
  };

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <button style={buttonStyle} onClick={() => onLanguageSelect("english")}>
        English
      </button>
      <button style={buttonStyle} onClick={() => onLanguageSelect("spanish")}>
        Spanish
      </button>
      <button style={buttonStyle} onClick={() => onLanguageSelect("french")}>
        French
      </button>
    </nav>
  );
}

export default Navbar;
