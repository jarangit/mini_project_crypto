import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = ({ coinHistory, curentPrice, coinName }) => {
  console.log(curentPrice);
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#f5d64c",
        borderColor: "#f76656",
      },
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
    },
    plugings: {
      title: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display:false,
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="coion_chart">
      {/* <div className="coin_chart_title">
        <h3>{coinName}</h3>
      </div> */}
      <div className="cion_chart_price">
        <div className="price_change">Chamge:{coinHistory?.data?.change}</div>
        <div className="current_price">
          Current {coinName} Price: $ {curentPrice}
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
