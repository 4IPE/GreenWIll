import React, { useState, useEffect } from "react";
import "./style/Slider.css";

const slides = [
  {
    title: "Fresh Garden Salad",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    description: "Healthy and nutritious salad from our kitchen."
  },
  {
    title: "Protein Bowl",
    image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A delicious blend of protein-rich ingredients."
  },
  {
    title: "Green Smoothie",
    image: "https://images.pexels.com/photos/1034940/pexels-photo-1034940.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Packed with vitamins and superfoods."
  }
];

const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-content">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="slider-image"
        />
        <div className="slider-overlay">
          <h2>{slides[currentIndex].title}</h2>
          <p>{slides[currentIndex].description}</p>
        </div>
      </div>
      <button className="slider-nav slider-prev" onClick={goToPrevious}>
        ❮
      </button>
      <button className="slider-nav slider-next" onClick={goToNext}>
        ❯
      </button>
    </div>
  );
};

export default MainSlider;
