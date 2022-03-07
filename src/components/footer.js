import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div
      className="footer_copprRight"
      >
        Copyright © 2021
        <Link to="/">Cryptoverse Inc.</Link>
        <br />
        All Rights Reseved.
      </div>

      <div className="footer_menu" >
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </div>
    </div>
  );
};

export default Footer;
