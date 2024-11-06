// src/pages/FAQ.js
import React, { useState } from 'react';
import './style/FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        { question: 'How does GreenWill work?', answer: 'GreenWill provides eco-friendly delivery and a wide selection of healthy foods...' },
        { question: 'What payment methods are accepted?', answer: 'We accept Visa, MasterCard, and PayPal...' },
        { question: 'How can I track my order?', answer: 'Log into your account and check the order status in the orders section...' },
    ];

    return (
        <div className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAccordion(index)}>
                            {item.question}
                            <span className={`faq-icon ${activeIndex === index ? 'open' : ''}`}>+</span>
                        </div>
                        {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
