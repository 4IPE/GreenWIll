import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FullMenu from "./components/FullMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/full-menu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
