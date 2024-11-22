import React, { useState } from "react";
import useMenuItems from "./data/useMenuItems"; // Импортируем кастомный хук
import "./style/FullMenu.css";
import ProductModal from './ProductModal';

const FullMenu = () => {
    const { menuItems, loading, error } = useMenuItems(); // Используем кастомный хук
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Получаем уникальные категории из массива данных
    const categories = ["Все", ...new Set(menuItems.map((item) => item.category))];

    // Фильтруем блюда по выбранной категории
    const filteredItems =
        selectedCategory === "Все"
            ? menuItems
            : menuItems.filter((item) => item.category === selectedCategory);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    if (loading) {
        return <p>Загрузка меню...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
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
                        <div className="menu-item" key={item.id} onClick={() => openModal(item)}>
                            <img src={item.image} alt={item.name} className="menu-img"/>
                            <div className="menu-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <span>{item.price} ₽</span>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* Модальное окно */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </>
    );
};

export default FullMenu;
