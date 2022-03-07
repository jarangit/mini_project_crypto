import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
// import Select from "react-select";
import moment from "moment";

const News = ({ simplified }) => {
  const [optionSelect] = useState([]);
  const [newsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: cryptoApi } = useGetCryptosQuery(100);
  console.log(isFetching);
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: "1px dotted pink",
  //     color: state.isSelected ? "red" : "blue",
  //     padding: 20,
  //   }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = "opacity 300ms";

  //     return { ...provided, opacity, transition };
  //   },
  // };

  useEffect(() => {
    for (let i = 0; i < cryptoApi?.data?.coins?.length; i++) {
      const element = cryptoApi?.data?.coins[i];
      let obj = {};
      if (element) {
        obj["value"] = element.name;
        obj["label"] = element.name;
        optionSelect.push(obj);
      }
      console.log(optionSelect);
    }
  }, [cryptoApi]);

  if (isFetching) return "Loadding";
  return (
    <div>
      {/* <Select
        options={optionSelect}
        onChange={setNewsCategory}
      />
      {!simplified && (
        <select
          name="select_coins"
          id="select_coins"
          onChange={(e) => setNewsCategory(e.target.value)}
          className="new_select"
        >
          {cryptoApi?.data?.coins?.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )} */}

      {!simplified && <h1>News</h1>}
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
                  <div className="new_item_title">
                    {item.name.length > 50
                      ? `${item.name.substring(0, 50)}...`
                      : item.name}
                  </div>
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
