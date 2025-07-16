import { useState } from "react";
import "./App.css";
import Header from "./assets/Components/Layout/Layout/Header";
import Home from "./assets/Components/Layout/pages/Home";
import Footer from "./assets/Components/Layout/Layout/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
