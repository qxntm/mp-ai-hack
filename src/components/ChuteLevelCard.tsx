"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface valueProps {
  percentage: number;
}

export default function ChuteLevelCard({ percentage }: valueProps) {
  const chartColor = percentage < 50 || percentage > 80 ? "#FF5A65" : "#062F6E";
  const [isCrisis, setIsCrisis] = useState(false);

  useEffect(() => {
    setIsCrisis(percentage < 50 || percentage > 80);
  }, [percentage]);

  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage], // Percentage split
        backgroundColor: [chartColor, "#F4F7FE"], // Colors
        borderWidth: 0, // Remove borders
        borderRadius: 10,
      },
    ],
  };

  const options = {
    rotation: -90, // Start at the top
    circumference: 180, // Only show half of the doughnut
    cutout: "65%", // Create the "gauge" effect
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div className="min-w-[315px] h-[250px] bg-white px-[25px] py-[30px] rounded-2xl">
      <div className="text-2xl text-primary-navy-blue font-bold">
        Chute Level
      </div>
      <div className="text-sm text-primary-blue">Percentage</div>
      <div className="flex items-center justify-center space-x-5">
        <div className="w-[258px] h-[258px] relative">
          <Doughnut data={chartData} options={options} className="-mt-[50px]" />
          {isCrisis ? (
            <div
              className="text-3xl font-bold text-red"
              style={{
                position: "absolute",
                top: "43%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {percentage}%
            </div>
          ) : (
            <div
              className="text-3xl font-bold text-primary-navy-blue"
              style={{
                position: "absolute",
                top: "43%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {percentage}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
