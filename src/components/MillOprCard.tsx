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
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MillOperationalCardProps {
  millData: {
    millSpeed: number[];
    millRatio: number[];
    gSidePressure: number[];
    pSidePressure: number[];
    firstMillExtraction: number[];
  };
}

export default function MillOperationalCard({
  millData,
}: MillOperationalCardProps) {
  const [dataIndex, setDataIndex] = useState(1);

  // Set the interval to update the chart
  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prevIndex) =>
        Math.min(prevIndex + 1, millData.millSpeed.length)
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [millData]);

  const chartData = {
    labels: millData.millSpeed.slice(0, dataIndex).map((_, index) => index * 5), // Adjust the x-axis as needed
    datasets: [
      {
        label: "Mill Speed",
        data: millData.millSpeed.slice(0, dataIndex),
        borderColor: "#7B61FF",
        backgroundColor: "#7B61FF",
        fill: false,
        tension: 0.4,
        hoverBorderWidth: 5,
        hoverBackgroundColor: "#7B61FF",
      },
      {
        label: "Mill Ratio",
        data: millData.millRatio.slice(0, dataIndex),
        borderColor: "#F5A25D",
        backgroundColor: "#F5A25D",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Top Cap Pressure",
        data: millData.gSidePressure.slice(0, dataIndex),
        borderColor: "#4AB5EB",
        backgroundColor: "#4AB5EB",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Hyd. Lift",
        data: millData.pSidePressure.slice(0, dataIndex),
        borderColor: "#FAD862",
        backgroundColor: "#FAD862",
        fill: false,
        tension: 0.4,
      },
      {
        label: "First Mill Extraction",
        data: millData.firstMillExtraction.slice(0, dataIndex),
        borderColor: "#456CFF",
        backgroundColor: "#456CFF",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Normalized Value",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true, // Enable tooltips to show values on hover
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="min-w-[690px] h-[400px] bg-white px-[25px] py-[30px] rounded-2xl">
      <div className="text-2xl text-primary-navy-blue font-bold">
        Mill Operational
      </div>
      <div className="text-sm text-primary-blue">Insight</div>
      <div className="h-[285px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
