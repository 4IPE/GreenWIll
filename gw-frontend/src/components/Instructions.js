// src/pages/Instructions.js
import React from 'react';
import './style/Instructions.css';

const Instructions = () => {
    const steps = [
        'Sign up for a GreenWill account.',
        'Browse the menu and add items to your cart.',
        'Proceed to checkout and place your order.',
    ];

    return (
        <div className="instructions-container">
            <h2 className="instructions-title">How to Use GreenWill</h2>
            <ol className="instructions-list">
                {steps.map((step, index) => (
                    <li className="instruction-step" key={index}>
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Instructions;
