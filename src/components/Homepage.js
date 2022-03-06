import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;
const Homepage = () => {
  const { data, isFectching } = useGetCryptosQuery(10);
  console.log(isFectching);
  const glodbalStats = data?.data?.stats;
  return (
    <React.Fragment>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {glodbalStats && (
        <>
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Crptocurrencies"
                value={glodbalStats.total}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Exchanges"
                value={millify(glodbalStats.totalExchanges)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Market Cap"
                value={millify(glodbalStats.totalMarketCap)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total 24h Volome"
                value={millify(glodbalStats.total24hVolume)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Markets"
                value={millify(glodbalStats.totalMarkets)}
              />
            </Col>
          </Row>
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Top 10 in the world
            </Title>
            <Title level={3} className="show-more">
              <Link to="/cryptocurrencies">Show Mores</Link>
            </Title>
          </div>
          <Cryptocurrencies simplified = {true}/>

          <div className="home-heading-container">
            <Title level={2} className="home-title">
              News
            </Title>
            <Title level={3} className="show-more">
              <Link to="/news">Show Mores</Link>
            </Title>
          </div>
          <News simplified/>
        </>
      )}
    </React.Fragment>
  );
};

export default Homepage;
