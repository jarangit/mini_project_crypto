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
        backgroundColor: "#3578ba",
        borderColor: "#2ceac4",
     
      },
    ],
  };

  const options = {
  
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
        grace: "10%",
        ticks: {
          color: "#f96934",
          display: true,
        },
        grid: {
          color: "#515151",
        },
      },
      x: {
        max: 50,
        ticks: {
          display: false,
        },
        grid: {
          color: "white",
          display: false,
          
        },
      },
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
