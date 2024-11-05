// FeaturedCategories.js
import React from 'react';
import './style/FeaturedCategories.css'

function FeaturedCategories() {
    const categories = [
        { name: "The Garden Salad", price: "€12", img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
        { name: "Protein Bowl", price: "€9", img: "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Green Smoothie", price: "€6", img: "https://media.istockphoto.com/id/470509876/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%88%D0%BF%D0%B8%D0%BD%D0%B0%D1%82-%D1%81%D0%BC%D1%83%D0%B7%D0%B8.jpg?b=1&s=612x612&w=0&k=20&c=po22RFFxGlKIn_v_zxzp_xZNA9w1prYd3yFuOaCpslA=" },
        // Добавьте больше категорий, если необходимо
    ];

    return (
        <div className="featured-categories">
            <h2 className="section-title">Featured Categories</h2>
            <div className="category-cards">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <img src={category.img} alt={category.name} className="category-img" />
                        <div className="category-info">
                            <h3>{category.name}</h3>
                            <p>{category.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedCategories;
