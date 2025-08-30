import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RomanticLanding from "./components/RomanticLanding";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import LoveLetter from "./components/LoveLetter";

function App() {
  const [showLetter, setShowLetter] = useState(true);

  const closeLetter = () => {
    setShowLetter(false);
  };

  return (
    <div className="App">
      {/* Love Letter Animation */}
      {showLetter && <LoveLetter onClose={closeLetter} />}
      
      {/* Main Content */}
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