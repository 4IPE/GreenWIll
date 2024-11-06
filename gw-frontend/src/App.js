// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext"; // импортируем CartProvider
import Home from "./components/Home";
import FullMenu from "./components/FullMenu";
import AboutUs from "./components/AboutUs";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Login from "./components/Login";
import FAQ from "./components/FAQ";
import CustomerService from "./components/CustomerService";
import ContactUs from "./components/ContactUs";
import Instructions from "./components/Instructions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SiteMap from "./components/SiteMap";
import Subscriptions from "./components/Subscriptions";

function App() {
    return (
        <CartProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<FullMenu />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/profile" element={<Account />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/customer-service" element={<CustomerService />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/instructions" element={<Instructions />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/sitemap" element={<SiteMap />} />
                        <Route path="/subscriptions" element={<Subscriptions />} />
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}

export default App;
