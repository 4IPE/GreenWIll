import React from "react";
import {  FaInstagram, FaVk, FaTelegram } from "react-icons/fa";
import "./style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Лого и краткое описание */}
        <div className="footer-logo">
          <h2>GreenWill</h2>
          <p>Ваш надежный сервис доставки здоровой и полезной еды.</p>
        </div>

        {/* Ссылки */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Помощь</h3>
            <a href="#faq">FAQ</a>
            <a href="#customer-service">Обслуживание клиентов</a>
            <a href="#how-to-guides">Инструкции</a>
            <a href="#contact-us">Связаться с нами</a>
          </div>
          <div className="footer-column">
            <h3>Другое</h3>
            <a href="#privacy-policy">Политика конфиденциальности</a>
            <a href="#sitemap">Карта сайта</a>
            <a href="#subscriptions">Подписки</a>
          </div>
        </div>

        {/* Подписка на рассылку */}
        <div className="footer-subscribe">
          <h3>Подписаться на новости</h3>
          <p>Получайте лучшие предложения на здоровую и вкусную еду с доставкой прямо на ваш email!</p>
          <input type="email" placeholder="Введите ваш email" />
          <button>Подписаться</button>
        </div>

        {/* Соцсети */}
        <div className="footer-socials">
          <a href="#vk"><FaVk/></a>
          <a href="#telegram"><FaTelegram/></a>
          <a href="#instagram"><FaInstagram /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GreenWill. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
