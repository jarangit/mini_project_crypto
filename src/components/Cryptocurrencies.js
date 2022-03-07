import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import Loading from "./Loading";

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
  }, [cryptosList, searchTerm, cryptos]);

  console.log(cryptos);
  if (isFetching) return <Loading/>;
  return (
    <React.Fragment>
      {!simplified && (
        <div className="search_crypto">
          <input
            placeholder="Search"
            onChange={(e) => setsearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {cryptos && (
        <div className="crypto_card_container">
          {cryptos?.map((item, key) => (
            <div className="crypto_card">
              <Link to={`/crypto/${item.uuid} `} key={item.uuid}>
                <div style={{textAlign: "center"}} >
                  <img
                    className="crypto_image"
                    src={item.iconUrl}
                    alt={item.iconUrl}
                  />
                </div>
                <div className="crypto_desc">
                  <div className="crypto_name">
                    {item.rank} {item.name}
                  </div>
                  <p>MC: {millify(item.marketCap)}</p>
                  <p>DC: {item.change}</p>
                </div>
              </Link>
                  <div className="crypto_price">{millify(item.price)}</div>
              
            </div>
          ))}
          {cryptos.length === 0 && searchTerm ? "Not Foumd" : ""}
        </div>
      )}
    </React.Fragment>
  );
};

export default Cryptocurrencies;
