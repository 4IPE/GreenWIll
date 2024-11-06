import React from "react";
import { Link } from "react-router-dom";
import "./style/SiteMap.css";

const SiteMap = () => {
    return (
        <div className="site-map">
            <h1 className="page-title">Карта сайта</h1>
            <div className="site-map-section">
                <h2>Основные разделы</h2>
                <Link to="/">Главная</Link>
                <Link to="/menu">Меню</Link>
                <Link to="/about">О нас</Link>
            </div>
            <div className="site-map-section">
                <h2>Помощь и поддержка</h2>
                <Link to="/faq">FAQ</Link>
                <Link to="/customer-service">Обслуживание клиентов</Link>
                <Link to="/instructions">Инструкции</Link>
                <Link to="/contact-us">Связаться с нами</Link>
            </div>
        </div>
    );
};

export default SiteMap;
