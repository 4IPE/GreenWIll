import React from "react";
import "./style/AboutUs.css";
import { FaLeaf, FaSmile, FaSeedling, FaAward } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="aboutus">
            {/* Заголовок с плавной анимацией */}
            <header className="aboutus-header">
                <h1 className="aboutus-title">О нас</h1>
                <p className="aboutus-subtitle">GreenWill – ваш путь к здоровью и экологичному образу жизни.</p>
            </header>

            {/* Блок с основной информацией и историей компании */}
            <section className="aboutus-section">
                <div className="aboutus-content">
                    <h2>Наша миссия</h2>
                    <p>
                        Мы в GreenWill стремимся сделать здоровое питание доступным и
                        удобным для всех. Наша цель – вдохновить людей на правильное питание и заботу о
                        планете, предлагая вкусные и полезные блюда из натуральных ингредиентов.
                    </p>
                </div>
                <div className="aboutus-image">
                    <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="GreenWill healthy meals" />
                </div>
            </section>

            {/* Карточки с ценностями компании */}
            <section className="aboutus-values">
                <h2>Наши ценности</h2>
                <div className="aboutus-values-cards">
                    <div className="value-card">
                        <FaLeaf className="value-icon" />
                        <h3>Экологичность</h3>
                        <p>Мы заботимся о природе, используя биоразлагаемые материалы и минимизируя отходы.</p>
                    </div>
                    <div className="value-card">
                        <FaSeedling className="value-icon" />
                        <h3>Натуральность</h3>
                        <p>Только свежие и натуральные ингредиенты – основа всех наших блюд.</p>
                    </div>
                    <div className="value-card">
                        <FaSmile className="value-icon" />
                        <h3>Забота о клиентах</h3>
                        <p>Наши блюда поднимают настроение и дают энергию на целый день.</p>
                    </div>
                    <div className="value-card">
                        <FaAward className="value-icon" />
                        <h3>Качество</h3>
                        <p>Мы стремимся к высоким стандартам и контролируем каждый этап производства.</p>
                    </div>
                </div>
            </section>

            {/* Блок с анимацией при прокрутке */}
            <section className="aboutus-cta">
                <h2>Присоединяйтесь к GreenWill</h2>
                <p>Сделайте шаг навстречу здоровому будущему вместе с нами!</p>
                <button className="cta-button">Узнать больше</button>
            </section>
        </div>
    );
};

export default AboutUs;
