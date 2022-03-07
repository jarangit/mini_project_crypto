import { MenuUnfoldOutlined } from "@ant-design/icons";
import React, {useState} from "react";
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
  const [toggle, settoggle] = useState(false);
  console.log(toggle);
  return (
    <div className="app">
      <div className="hamberger">
        <MenuUnfoldOutlined
          style={{ fontSize: "34px" ,color: "#ff56ba"}}
          onClick={() => settoggle(!toggle)}
        />
      </div>
      <div className="navbar">
        <Navbar active = {toggle} close = {settoggle} />
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
            <Route exact path="/crypto/:coinId" element={<CryptoDetail />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App;
