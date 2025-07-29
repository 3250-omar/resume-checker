import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="font-bold text-xl text-gradient">
        Resumeee
      </Link>
      <Link to="/upload" className="w-fit primary-button">
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
