// src/pages/ContactUs.js
import React, { useState } from 'react';
import './style/ContactUs.css';

const ContactUs = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Сброс через 3 сек.
    };

    return (
        <div className="contact-container">
            <h2 className="contact-title">Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" required className="contact-input" />
                <input type="email" placeholder="Your Email" required className="contact-input" />
                <textarea placeholder="Your Message" required className="contact-textarea"></textarea>
                <button type="submit" className="contact-button">Send Message</button>
            </form>
            {submitted && <p className="contact-success">Thank you! We’ll get back to you soon.</p>}
        </div>
    );
};

export default ContactUs;
