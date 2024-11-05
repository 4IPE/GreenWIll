import React, { useState } from "react";
import menuItems from "./data/menuItems"; // Массив данных блюд
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./style/FullMenu.css";

const FullMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");

  // Получаем уникальные категории из массива данных
  const categories = ["Все", ...new Set(menuItems.map((item) => item.category))];

  // Фильтруем блюда по выбранной категории
  const filteredItems =
    selectedCategory === "Все"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="full-menu-container">
        {/* Сайдбар с категориями */}
        <aside className="menu-sidebar">
          <h3>Категории</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "active" : ""}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Основная часть с блюдами */}
        <section className="menu-items-grid">
          {filteredItems.map((item) => (
            <div className="menu-item" key={item.id}>
              <img src={item.image} alt={item.name} className="menu-img" />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FullMenu;
