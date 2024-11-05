import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedCategories from "./FeaturedCategories";
import Menu from "./Menu"; 
import Slider from "./Slider"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <Slider></Slider>
        <FeaturedCategories />
        <div className="menu-section">
          <Menu limit={4} /> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
