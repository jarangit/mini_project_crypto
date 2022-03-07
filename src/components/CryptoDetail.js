import React, { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import HTMLReactParser from "html-react-parser";
import LineChart from "./chart/LineChart";

const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timeperiod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailQuery(coinId, timeperiod);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;
  // const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  if (isFetching) {
    return "Loading";
  }
  console.log(data);
  return (
    <div className="coin_detail">
      <div className="coin_detail_title">
        <img src={data?.data?.coin.iconUrl} alt="" width={50} />
        <h3>
          {data?.data?.coin.name}({cryptoDetails.symbol})
        </h3>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>

      {/* <div>
        <select name="coin_detail_day" id="coin_detail_day">
          {time.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div> */}

      <LineChart
        coinHistory={coinHistory}
        curentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />

      <div className="coin_detail_stats">
        <div className="coin_detail_stats_title">
          <h3>{cryptoDetails.name} Value Statistics</h3>
          <p>
            An overview showing the statistics of {cryptoDetails.name}, such as
            the base and quote currency, the rank, and trading volume.
          </p>
        </div>

        <div className="coin_detail_stats_list">
          {stats.map(({ icon, title, value }, key) => (
            <div key={key} className="coin_detail_stats_item">
              <div className="cion_detail_icon">{icon}</div>
              <div>{title}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>

        <div className="coin_detail_other_stats_info">
          <h3>Other stats info</h3>
          <p>
            An overview showing the statistics of {cryptoDetails.name}, such as
            the base and quote currency, the rank, and trading volume.
          </p>
          <div className="coin_detail_other_stats_info_box">
            {genericStats.map(({ icon, title, value }, key) => (
              <div className="coin_detail_other_stats_info_item" key={key}>
                <div className="cion_detail_icon" >{icon}</div>
                <div>{title}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="coin_detail_coin_desc_link">
        <h2>What is {cryptoDetails.name}</h2>
        <p>{HTMLReactParser(cryptoDetails.description)}</p>
        <h3>{cryptoDetails.name} Links</h3>

        {cryptoDetails.links?.map((item, key) => (
          <ul key={key}>
            <li>{item.type}</li>
            <li>{item.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CryptoDetail;
