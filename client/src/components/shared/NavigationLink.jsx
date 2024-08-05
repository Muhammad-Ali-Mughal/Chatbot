import React from "react";
import { Link } from "react-router-dom";

function NavigationLink({ to, text, bgColor, textColor, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="nav-link"
      style={{ background: bgColor, color: textColor }}
    >
      {text}
    </Link>
  );
}

export default NavigationLink;
