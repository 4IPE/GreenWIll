import React from "react";
import FeaturedCategories from "./FeaturedCategories";
import Menu from "./Menu";
import Slider from "./Slider"

const Home = () => {
    return (
        <>
            <div className="home-container">
                <Slider></Slider>
                <FeaturedCategories/>
                <div className="menu-section">
                    <Menu limit={4}/>
                </div>
            </div>
        </>
    );
};

export default Home;
