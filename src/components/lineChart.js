import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div className="flex justify-center w-1/2 m-auto">
      <Line data={chartData}></Line>
    </div>
  );
}

export default LineChart;
