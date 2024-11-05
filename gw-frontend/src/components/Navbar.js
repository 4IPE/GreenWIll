// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import "./style/Navbar.css";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            {/* Логотип с Link для перехода на главную страницу */}
            <Link to="/" className="navbar-logo">
                GreenWill
            </Link>

            {/* Основное меню */}
            <div className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <Link to="/menu" className="navbar-item">Menu</Link>
                <Link to="/about" className="navbar-item">About</Link>
            </div>

            {/* Иконки пользователя и корзины */}
            <div className="navbar-icons">
                {/* Переход к странице профиля */}
                <Link to="/profile" className="navbar-icon">
                    <FaUser title="Profile" />
                </Link>
                {/* Переход к странице корзины */}
                <Link to="/cart" className="navbar-icon">
                    <FaShoppingCart title="Cart" />
                </Link>
                <FaBars className="navbar-hamburger" onClick={toggleMobileMenu} />
            </div>
        </nav>
    );
};

export default Navbar;
