// src/pages/CustomerService.js
import React from 'react';
import './style/CustomerService.css';

const CustomerService = () => {
    const serviceItems = [
        { title: 'Returns', description: 'We offer a 30-day return policy...' },
        { title: 'Shipping', description: 'All orders over $50 receive free shipping...' },
        { title: 'Warranty', description: 'GreenWill products come with a 1-year warranty...' },
    ];

    return (
        <div className="service-container">
            <h2 className="service-title">Customer Service</h2>
            <div className="service-list">
                {serviceItems.map((item, index) => (
                    <div className="service-card" key={index}>
                        <h3 className="service-card-title">{item.title}</h3>
                        <p className="service-card-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerService;
