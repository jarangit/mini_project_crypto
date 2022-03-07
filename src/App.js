import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Homepage,
  CryptoDetail,
  Cryptocurrencies,
  Exchanges,
  News,
} from "./components";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route
                exact
                path="/crypto/:coinId"
                element={<CryptoDetail />}
              />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
      {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App;
