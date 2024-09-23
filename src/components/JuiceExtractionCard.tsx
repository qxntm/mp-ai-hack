"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface JuiceExtractionProps {
  juiceData: {
    actual: number[];
    predict: number[];
  };
  rmse: number;
}

export default function JuiceExtractionCard({
  juiceData,
  rmse,
}: JuiceExtractionProps) {
  const [dataIndex, setDataIndex] = useState(0); // Start from index 0

  useEffect(() => {
    if (!juiceData || !juiceData.actual.length) return; // Check if juiceData exists and has data

    const interval = setInterval(() => {
      setDataIndex((prevIndex) => (prevIndex + 1) % juiceData.actual.length); // Loop back to 0 when reaching the end
    }, 5000); // Update every 15 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!juiceData || !juiceData.actual || !juiceData.predict) {
    return <div>Loading...</div>; // Render a loading state if juiceData is undefined
  }

  const chartData = {
    labels: juiceData.actual.slice(0, dataIndex + 1).map((_, index) => index * 15), // Assuming intervals in seconds
    datasets: [
      {
        label: "Predict",
        data: juiceData.predict.slice(0, dataIndex + 1),
        backgroundColor: "#062F6E", // Blue color
      },
      {
        label: "Actual",
        data: juiceData.actual.slice(0, dataIndex + 1),
        backgroundColor: "#00AEEF", // Lighter blue
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: "Time (seconds)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 5,
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="min-w-[315px] h-[400px] bg-white px-[25px] py-[30px] rounded-2xl drop-shadow-xl">
      <div className="flex items-center justify-between mx-5">
        <div>
          <div className="text-2xl text-primary-navy-blue font-bold">
            Juice Extraction
          </div>
          <div className="text-sm text-primary-blue">Actual vs. Prediction</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm text-primary-blue">RMSE</div>
          <div className="text-primary-navy-blue font-bold text-3xl">{rmse}%</div>
        </div>
      </div>
      <div className="h-[285px] mt-[20px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
