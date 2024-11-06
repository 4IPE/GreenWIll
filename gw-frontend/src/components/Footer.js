import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import { FaInstagram, FaVk, FaTelegram } from "react-icons/fa";
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
              <Link to="/faq">FAQ</Link>
              <Link to="/customer-service">Обслуживание клиентов</Link>
              <Link to="/instructions">Инструкции</Link>
              <Link to="/contact-us">Связаться с нами</Link>
            </div>
            <div className="footer-column">
              <h3>Другое</h3>
              <Link to="/privacy-policy">Политика конфиденциальности</Link>
              <Link to="/sitemap">Карта сайта</Link>
              <Link to="/subscriptions">Подписки</Link>
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
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer"><FaVk /></a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GreenWill. Все права защищены.</p>
        </div>
      </footer>
  );
};

export default Footer;
