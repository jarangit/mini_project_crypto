import React, { useState, useEffect } from "react";
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
  }, [cryptosList, searchTerm, cryptos]);

  console.log(cryptos);
  if (isFetching) return "Loading";
  return (
    <React.Fragment>
      {!simplified && (
        <div className="search_rypto">
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
                <div>
                  <div>
                    {item.rank} {item.name}
                  </div>
                  <img
                    className="crypto_image"
                    src={item.iconUrl}
                    alt={item.iconUrl}
                    width={30}
                  />
                  <p>Price:{millify(item.price)}</p>
                  <p>Market Cap: {millify(item.marketCap)}</p>
                  <p>Daily Change: {item.change}</p>
                </div>
              </Link>
            </div>
          ))}
          {cryptos.length === 0 && searchTerm ? "Not Foumd" : ""}
        </div>
      )}
    </React.Fragment>
  );
};

export default Cryptocurrencies;
