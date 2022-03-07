import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined, BulbOutlined, FundOutlined, CloseCircleOutlined } from "@ant-design/icons";
const Navbar = ({ active, close }) => {
  return (
    <div className={`nav_container ${active ? "active" : ""} `}>
      <div onClick={() => close(false)}>
          <CloseCircleOutlined style={{fontSize: "24px", float: "right", marginBottom: "20px", color: "#ff56ba"}} />
        </div>
      <div className="logo_container">
        <img
          width={50}
          src={
            "https://upload.wikimedia.org/wikipedia/commons/9/97/Cryptocurrency_Gold.png"
          }
          alt=""
        />
        <div className="logo">
          <Link to="/">
            <h1>Crypto</h1>
          </Link>
        </div>
      </div>
      <div className="side_menu">
        <div className="side_menu_item">
          <Link to="/">
            <span>
              <HomeOutlined />
            </span>
            Home
          </Link>
        </div>
        <div className="side_menu_item">
          <Link to="/cryptocurrencies">
            <span>
              <FundOutlined />
            </span>
            Cryptocurrencise
          </Link>
        </div>
        {/* <div className="side_menu_item">
          <Link to="/exchanges">
            <span>
              <MoneyCollectOutlined />
            </span>
            Exchanges
          </Link>
        </div> */}
        <div className="side_menu_item">
          <Link to="/news">
            <span>
              <BulbOutlined />
            </span>
            News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
