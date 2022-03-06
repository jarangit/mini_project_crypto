import React from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "../components";

const Homepage = () => {
  const { data, isFectching } = useGetCryptosQuery(10);
  console.log(isFectching);
  const glodbalStats = data?.data?.stats;
  return (
    <React.Fragment>
      <div className="heading">
        <h1>Global Crypto Stats</h1>
      </div>
      {glodbalStats && (
        <>
          <div className="home_show_data">
            <div className="home_show_data_item">
              <div>Total Crptocurrencies</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.total)}
              </div>
            </div>
            <div className="home_show_data_item">
              <div>Total Exchanges</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.totalExchanges)}
              </div>
            </div>
            <div className="home_show_data_item">
              <div>Total Market Cap</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.totalMarketCap)}
              </div>
            </div>
            <div className="home_show_data_item">
              <div>Total 24h Volome</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.total24hVolume)}
              </div>
            </div>
            <div className="home_show_data_item">
              <div>Total Markets</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.total24hVolume)}
              </div>
            </div>
            <div className="home_show_data_item">
              <div>Total Crptocurrencies</div>
              <div className="home_show_data_item_num">
                {millify(glodbalStats.total)}
              </div>
            </div>
          </div>
          <div className="home_heading_container">
            <h1 className="home_title">Top 10 in the world</h1>
            <h1 className="show_more">
              <Link to="/cryptocurrencies">Show Mores</Link>
            </h1>
          </div>
          <Cryptocurrencies simplified={true} />

          <div className="home_heading_container">
            <h1 className="home_title">News</h1>
            <div className="show_more">
              <Link to="/news">Show Mores</Link>
            </div>
          </div>
          <News simplified />
        </>
      )}
    </React.Fragment>
  );
};

export default Homepage;
