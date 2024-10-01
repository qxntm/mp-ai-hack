/* eslint-disable react-hooks/exhaustive-deps */
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
    fiber: number[];
    moisture: number[];
    pol: number[];
    firstMillExtraction: number[];
  };
}

export default function MillOperationalCard({
  millData,
}: MillOperationalCardProps) {
  const [dataIndex, setDataIndex] = useState(0); // Start at index 0
  const [timeFrame, setTimeFrame] = useState("Now"); // Set default to 'Now'

  const staticMillData = {
    fiber: [
      39.173, 78.7305, 79.7266, 40.6133, 40.7318, 40.2522, 42.4928, 42.4662, 42.0725, 
      40.5442, 40.1643, 40.379, 40.7538, 40.6051, 39.6014, 39.3357, 39.6875, 38.6081, 
      40.5404, 40.0494, 40.896, 40.9699, 41.3805, 41.6365, 41.6744, 41.5772, 41.2175, 
      41.4942, 40.9637, 42.1571, 40.2315, 40.5053
    ],    
    moisture: [
      46.3232, 89.8382, 89.4427, 43.7368, 44.1023, 43.6163, 42.5346, 41.672, 43.3564, 
      44.6138, 43.3272, 42.8782, 42.4985, 44.4027, 44.1047, 42.7431, 44.7243, 45.6997, 
      44.8134, 44.0915, 44.0684, 43.0943, 42.7575, 42.4519, 41.4498, 42.6689, 45.5945, 
      42.2927, 40.9373, 42.7644, 45.4002, 44.5717
    ],
    pol: [
      15.2163, 30.9792, 28.6212, 13.8767, 16.945, 16.9013, 14.5092, 14.6775, 14.8126, 
      15.7006, 14.8976, 14.5632, 14.5491, 14.7377, 15.3946, 14.7715, 15.5517, 16.481, 
      15.2822, 14.6864, 14.7399, 14.8958, 14.6352, 13.8682, 13.4403, 13.9674, 14.6446, 
      14.3913, 13.8698, 13.8542, 14.6058, 15.1232
    ],    
    firstMillExtraction: [
      70.6455, 141.3713, 145.0071, 74.8984, 68.9943, 70.0832, 74.6836, 75.4253,
      73.9451, 72.6634, 73.7364, 73.1052, 73.2674, 73.2873, 68.6917, 69.6822,
      69.7037, 68.0751, 72.3098, 73.8257, 72.3185, 70.9149, 73.6007, 76.3253,
      76.632, 75.4217, 73.127, 74.107, 76.1959, 76.4614, 72.9596, 73.9524,
    ],
  };

  // Set the interval to update the chart
  useEffect(() => {
    if (timeFrame === "Now") {
      const interval = setInterval(() => {
        setDataIndex((prevIndex) => {
          const newIndex =
            prevIndex === millData.fiber.length - 1 ? 0 : prevIndex + 1;
          return newIndex;
        });
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [timeFrame, millData.fiber.length]); // Only run for "Now"

  // Update the logic in getDataForTimeFrame

  const getDataForTimeFrame = () => {
    if (timeFrame === "Now") {
      // This should plot the data progressively until dataIndex
      return {
        labels: millData.fiber
          .slice(0, dataIndex + 1)
          .map((_, index) => index * 15),
        datasets: [
          {
            label: "Fiber 1st Bagasse",
            data: millData.fiber.slice(0, dataIndex + 1),
            borderColor: "#7B61FF",
            backgroundColor: "#7B61FF",
            fill: false,
            tension: 0.4,
            yAxisID: "y1",
          },
          {
            label: "Moisture 1st Bagasse",
            data: millData.moisture.slice(0, dataIndex + 1),
            borderColor: "#F5A25D",
            backgroundColor: "#F5A25D",
            fill: false,
            tension: 0.4,
            yAxisID: "y2",
          },
          {
            label: "Pol 1st Bagasse",
            data: millData.pol.slice(
              0,
              Math.min(dataIndex + 1, millData.pol.length)
            ), // Ensure slice only up to available data
            borderColor: "#4AB5EB",
            backgroundColor: "#4AB5EB",
            fill: false,
            tension: 0.4,
            yAxisID: "y3",
          },
          {
            label: "First Mill Extraction",
            data: millData.firstMillExtraction.slice(0, dataIndex + 1),
            borderColor: "#456CFF",
            backgroundColor: "#456CFF",
            fill: false,
            tension: 0.4,
            yAxisID: "y4",
          },
        ],
      };
    } else {
      // Static data handling, plot the last N data points
      let dataLength = 0;
      switch (timeFrame) {
        case "Last 4 hours":
          dataLength = 16;
          break;
        case "Last 6 hours":
          dataLength = 24;
          break;
        case "Last 8 hours":
          dataLength = 32;
          break;
        default:
          dataLength = 0;
      }
  
      // Adjust to take the last N data points from the arrays
      return {
        labels: staticMillData.fiber
          .slice(-dataLength)
          .map((_, index) => index * 15),
        datasets: [
          {
            label: "Fiber 1st Bagasse",
            data: staticMillData.fiber.slice(-dataLength),
            borderColor: "#7B61FF",
            backgroundColor: "#7B61FF",
            fill: false,
            tension: 0.4,
            yAxisID: "y1",
          },
          {
            label: "Moisture 1st Bagasse",
            data: staticMillData.moisture.slice(-dataLength),
            borderColor: "#F5A25D",
            backgroundColor: "#F5A25D",
            fill: false,
            tension: 0.4,
            yAxisID: "y2",
          },
          {
            label: "Pol 1st Bagasse",
            data: staticMillData.pol.slice(-dataLength),
            borderColor: "#4AB5EB",
            backgroundColor: "#4AB5EB",
            fill: false,
            tension: 0.4,
            yAxisID: "y3",
          },
          {
            label: "First Mill Extraction",
            data: staticMillData.firstMillExtraction.slice(-dataLength),
            borderColor: "#456CFF",
            backgroundColor: "#456CFF",
            fill: false,
            tension: 0.4,
            yAxisID: "y4",
          },
        ],
      };
    }
  };
  
  const options: ChartOptions<"line"> = {
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
        position: "right",
        title: {
          display: true,
          text: "Fiber 1st Bagasse",
          color: "#7B61FF",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Moisture 1st Bagasse",
          color: "#F5A25D",
        },
      },
      y3: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Pol 1st Bagasse",
          color: "#4AB5EB",
        },
      },
      y4: {
        type: "linear",
        position: "left",
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
      <div className="flex justify-between items-center mx-5">
        <div>
          <div className="text-2xl text-primary-navy-blue font-bold">
            Mill Operational
          </div>
          <div className="text-sm text-primary-blue">Insight</div>
        </div>
        <div>
          {/* Dropdown for time selection */}
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg h-[40px] w-[120px] text-xs"
          >
            <option value="Now">Now</option>
            <option value="Last 4 hours">Last 4 hours</option>
            <option value="Last 6 hours">Last 6 hours</option>
            <option value="Last 8 hours">Last 8 hours</option>
          </select>
        </div>
      </div>
      <div className="h-[285px] mt-[20px]">
        <Line data={getDataForTimeFrame()} options={options} />
      </div>
    </div>
  );
}
