import React from "react";
import "./style/Subscriptions.css";

const Subscriptions = () => {
    return (
        <div className="subscriptions">
            <h1 className="page-title">Подписки</h1>
            <div className="subscription-card">
                <h2>Базовая подписка</h2>
                <p>Получайте еженедельные подборки наших лучших блюд.</p>
                <button>Оформить подписку</button>
            </div>
            <div className="subscription-card">
                <h2>Премиум подписка</h2>
                <p>Доступ к эксклюзивным блюдам и дополнительным скидкам.</p>
                <button>Оформить подписку</button>
            </div>
        </div>
    );
};

export default Subscriptions;
