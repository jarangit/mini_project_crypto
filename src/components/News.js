import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import moment from "moment";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: cryptoApi } = useGetCryptosQuery(100);
  console.log(isFetching);

  if (isFetching) return "Loadding";
  return (
    <div className="new_box">
      {!simplified && (
        <select
          name="select_coins"
          id="select_coins"
          onChange={(e) => setNewsCategory(e.target.value)}
        >
          {cryptoApi?.data?.coins?.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
      {cryptoNews.value.map((item, key) => (
        <div
          key={key}
          className="new_item"
          style={{ border: "2px solid red", margin: "10px" }}
        >
          <a href={item.url} target="_blank" rel="noreferrer">
            <div className="new_item_img_box">
              <img src={item.image?.thumbnail?.contentUrl || ""} alt="" width={30}/>
              <div className="new_item_title">{item.name}</div>
              <p className="new_item_desc">
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>

              <div className="new_item_prvider">
                <div className="new_item_avatar">
                  <img
                    src={item.provider[0]?.image?.thumbnail?.contentUrl || ""}
                    alt=""
                    className="new_avatar"
                    width={30}
                  />
                  <p className="new_item_avatar_title">
                    {item.provider[0]?.name}
                  </p>
                </div>
                <p>{moment(item.dataPublished).startOf("ss").fromNow()}</p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
