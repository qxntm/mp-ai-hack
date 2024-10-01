"use client";
import React, { useEffect, useState } from "react";
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
  ChartOptions,
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
      setDataIndex((prevIndex) => {
        const newIndex =
          prevIndex === juiceData.predict.length - 1 ? 0 : prevIndex + 1;
        return newIndex;
      }); // Increment but stop at the last prediction index
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!juiceData || !juiceData.actual || !juiceData.predict) {
    return <div>Loading...</div>; // Render a loading state if juiceData is undefined
  }

  const chartData = {
    labels: Array.from({ length: dataIndex + 1 }, (_, i) => i * 15), // Time intervals (0s, 15s, 30s...)
    datasets: [
      {
        label: "Predict",
        data: juiceData.predict.slice(0, dataIndex + 1), // Plot the predict values first
        borderColor: "#062F6E",
        backgroundColor: "#062F6E",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Actual",
        data: juiceData.actual
          .slice(0, Math.max(0, dataIndex))
          .map((val, i) => {
            const correspondingPredictIndex = i; // Actual should plot one step behind
            return {
              x: correspondingPredictIndex * 15, // Aligns with the correct time
              y: val,
            };
          }),
        borderColor: "#00AEEF",
        backgroundColor: "#00AEEF",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: "Time",
        },
      },
      y: {
        beginAtZero: false,
        min: 60,
        max: 90,
        title: {
          display: false,
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
          <div className="text-primary-navy-blue font-bold text-3xl">
            {rmse}%
          </div>
        </div>
      </div>
      <div className="h-[285px] mt-[20px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
