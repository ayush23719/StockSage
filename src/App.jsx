import "semantic-ui-css/semantic.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Stocks from "./pages/stocks";
import Analysis from "./pages/analysis";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/stocks" element={<Stocks />} />
          <Route exact path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
