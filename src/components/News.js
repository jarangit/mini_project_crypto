import React , {useState} from "react";
import { Select } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewApi";

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  console.log(data);
  return <div>News</div>;
};

export default News;
