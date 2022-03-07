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
    <div>
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
      <div className="new_box">
        {cryptoNews.value.map((item, key) => (
          <div key={key} className="new_item">
            <a href={item.url} target="_blank" rel="noreferrer">
              <div>
                <div className="new_item_box_title">
                  <img
                    src={
                      item.image?.thumbnail?.contentUrl ||
                      "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                    }
                    alt=""
                    className="new_item_img"
                  />
                  <div className="new_item_title">{item.name}</div>
                </div>
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
                  </div>
                  <p className="new_item_avatar_title">
                    {item.provider[0]?.name}
                  </p>
                </div>
                <span className="new_date">
                  {moment(item.dataPublished).startOf("ss").fromNow()}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
