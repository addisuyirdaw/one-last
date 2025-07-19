import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Layout/Header"; // Adjust the import path as necessary
import Footer from "./Components/Layout/Footer"; // Adjust the import path as necessary
import Home from "./Components/Pages/Home"; // Create Home component
import About from "./Components/Pages/About"; // Create About component
import Services from "./Components/Pages/Services"; // Create About component
import Election from "./Components/Pages/Election";
import Complaints from "./Components/Pages/Complaint";

import Contact from "./Components/Pages/Contact"; // Create Contact component
// import LoginForm from "./Components/Auth/LoginForm";
// import { LanguageProvider } from "./contexts/LanguageContext"; // Adjust the path
import { AuthProvider } from "./contexts/AuthContext.jsx"; // Adjust the path as necessary
import Latest from "./Components/Pages/Latest.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Election" element={<Election />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/Latest" element={<Latest />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
