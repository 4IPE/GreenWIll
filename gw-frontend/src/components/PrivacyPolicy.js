import React from "react";
import "./style/PrivacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <h1 className="page-title">Политика конфиденциальности</h1>
            <div className="policy-section">
                <h2>1. Введение</h2>
                <p>В GreenWill мы уважаем вашу конфиденциальность и обязуемся защищать ваши личные данные...</p>
            </div>
            <div className="policy-section">
                <h2>2. Какие данные мы собираем</h2>
                <p>Мы можем собирать и обрабатывать следующие данные: контактные данные, история заказов...</p>
            </div>
            <div className="policy-section">
                <h2>3. Как мы используем данные</h2>
                <p>Ваши данные могут использоваться для улучшения сервиса, персонализации предложений...</p>
            </div>
            <div className="policy-section">
                <h2>4. Контактная информация</h2>
                <p>Для вопросов о политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу...</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
