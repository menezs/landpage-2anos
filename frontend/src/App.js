import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RomanticLanding from "./components/RomanticLanding";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <RomanticLanding />
              <Timeline />
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;