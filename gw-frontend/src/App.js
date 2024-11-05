import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import FullMenu from "./components/FullMenu";
import AboutUs from "./components/AboutUs";
import Layout from "./components/Layout";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Login from "./components/Login";


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/menu" element={<FullMenu/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/profile" element={<Account/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
