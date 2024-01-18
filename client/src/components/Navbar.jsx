import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onLanguageSelect }) {
  const navigate = useNavigate()
  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "4px",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    marginLeft: "auto",  
  };

  const logOut = () => {
    localStorage.setItem("token", null);
    navigate("/");
  };

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <div>
        <button style={buttonStyle} onClick={() => onLanguageSelect("english")}>
          English
        </button>
        <button style={buttonStyle} onClick={() => onLanguageSelect("spanish")}>
          Spanish
        </button>
        <button style={buttonStyle} onClick={() => onLanguageSelect("french")}>
          French
        </button>
      </div>
      <button style={logoutButtonStyle} onClick={logOut}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
