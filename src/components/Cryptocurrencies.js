import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  console.log(simplified);
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  //data:cryptosList = Change Name data = cryptosList
  const [cryptos, setcryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setsearchTerm] = useState("");
  console.log(searchTerm);
  useEffect(() => {
    setcryptos(cryptosList?.data?.coins);
    if (searchTerm) {
      const filter = cryptos.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );

      setcryptos(filter);
    }
  }, [cryptosList, searchTerm]);

  console.log(cryptos);
  if (isFetching) return "Loading";
  return (
    <React.Fragment>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search"
            onChange={(e) => setsearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {cryptos && (
        <Row gutters={[32, 32]} className="crypto-card-container">
          {cryptos?.map((item, key) => (
            <Col xs={24} sm ={12} lg={6} key={key} className="crypto-card">
              <Link to={`/crypto/${item.uuid} `} key={item.uuid}>
                <Card
                  title={`${item.rank}. ${item.name}`}
                  extra={<img className="crypto-image" src={item.iconUrl} />}
                  hoverable
                >
                  <p>Price:{millify(item.price)}</p>
                  <p>Market Cap: {millify(item.marketCap)}</p>
                  <p>Daily Change: {item.change}</p>
                </Card>
              </Link>
            </Col>
          ))}
          {cryptos.length === 0 && searchTerm ? "Not Foumd" : ""}
        </Row>
      )}
    </React.Fragment>
  );
};

export default Cryptocurrencies;
