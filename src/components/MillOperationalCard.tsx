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
  const [dataIndex, setDataIndex] = useState(0); // Start at index 0

  // Set the interval to update the chart
  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prevIndex) => {
        const newIndex =
          prevIndex === millData.millSpeed.length - 1 ? 0 : prevIndex + 1;
        console.log("Updated Index: ", newIndex); // Debugging
        return newIndex;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, []); // Empty dependency array

  const chartData = {
    labels: millData.millSpeed.slice(0, dataIndex + 1).map((_, index) => index * 15), // Adjust x-axis for timing
    datasets: [
      {
        label: "Mill Speed",
        data: millData.millSpeed.slice(0, dataIndex + 1),
        borderColor: "#7B61FF",
        backgroundColor: "#7B61FF",
        fill: false,
        tension: 0.4,
        yAxisID: "y1",
      },
      {
        label: "Mill Ratio",
        data: millData.millRatio.slice(0, dataIndex + 1),
        borderColor: "#F5A25D",
        backgroundColor: "#F5A25D",
        fill: false,
        tension: 0.4,
        yAxisID: "y2",
      },
      {
        label: "G Side Pressure",
        data: millData.gSidePressure.slice(0, dataIndex + 1),
        borderColor: "#4AB5EB",
        backgroundColor: "#4AB5EB",
        fill: false,
        tension: 0.4,
        yAxisID: "y3",
      },
      {
        label: "P Side Pressure",
        data: millData.pSidePressure.slice(0, dataIndex + 1),
        borderColor: "#FAD862",
        backgroundColor: "#FAD862",
        fill: false,
        tension: 0.4,
        yAxisID: "y4",
      },
      {
        label: "First Mill Extraction",
        data: millData.firstMillExtraction.slice(0, dataIndex + 1),
        borderColor: "#456CFF",
        backgroundColor: "#456CFF",
        fill: false,
        tension: 0.4,
        yAxisID: "y5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: "Time (seconds)",
        },
      },
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Mill Speed",
          color: "#7B61FF",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Mill Ratio",
          color: "#F5A25D",
        },
      },
      y3: {
        type: "linear",
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "G Side Pressure",
          color: "#4AB5EB",
        },
      },
      y4: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "P Side Pressure",
          color: "#FAD862",
        },
      },
      y5: {
        type: "linear",
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "First Mill Extraction",
          color: "#456CFF",
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
    },
  };

  return (
    <div className="min-w-[690px] h-[400px] bg-white px-[25px] py-[30px] rounded-2xl drop-shadow-xl">
      <div className="text-2xl text-primary-navy-blue font-bold">
        Mill Operational
      </div>
      <div className="text-sm text-primary-blue">Insight</div>
      <div className="h-[285px] mt-[20px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
