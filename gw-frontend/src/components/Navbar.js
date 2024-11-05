import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import "./style/Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">GreenWill</div>

      {/* Основное меню */}
      <div className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="#menu" className="navbar-item">Menu</a>
        <a href="#about" className="navbar-item">About</a>
      </div>

      {/* Иконки пользователя и корзины */}
      <div className="navbar-icons">
        <FaUser title="Profile" />
        <FaShoppingCart title="Cart" />
        <FaBars className="navbar-hamburger" onClick={toggleMobileMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
