import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Layout/Header"; // Adjust the import path as necessary
import Footer from "./Components/Layout/Footer"; // Adjust the import path as necessary
import Home from "./Components/Pages/Home"; // Create Home component
import About from "./Components/Pages/About"; // Create About component
import Contact from "./Components/Pages/Contact"; // Create Contact component
import { LanguageProvider } from "./contexts/LanguageContext"; // Adjust the path

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;
