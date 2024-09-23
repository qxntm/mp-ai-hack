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
  const [timeFrame, setTimeFrame] = useState("Now"); // Set default to 'Now'

  const staticMillData = {
    millSpeed: [
      5.71165, 11.44813, 11.44295, 5.70069, 5.73559, 5.71442, 5.71299, 5.72897,
      5.71664, 5.73482, 5.72166, 5.73037, 5.71541, 5.71833, 5.71917, 5.71676,
      5.73138, 5.71129, 5.71551, 5.72948, 5.71639, 5.71713, 5.71689, 5.71761,
      5.72301, 5.71168, 5.73413, 5.70592, 5.72921, 5.70915, 5.71869, 5.74472,
    ],
    millRatio: [
      1.27885, 2.55823, 2.55483, 1.27673, 1.27806, 1.27519, 1.28007, 1.2765,
      1.27926, 1.27672, 1.27661, 1.27467, 1.27953, 1.27888, 1.27565, 1.27771,
      1.27596, 1.27589, 1.28103, 1.27639, 1.27779, 1.28219, 1.28072, 1.27904,
      1.27935, 1.27732, 1.27384, 1.28013, 1.27797, 1.27636, 1.27728, 1.27603,
    ],
    gSidePressure: [
      3061.61, 6126.67, 6133.87, 3070.36, 3066.35, 3065.66, 3069.34, 3068.42,
      3069.42, 3067.9, 3069.36, 3071.77, 3064.2, 3068.23, 3068.06, 3068.16,
      3067.24, 3067.12, 3071.69, 3073.82, 3073.39, 3073.23, 3072.74, 3072.31,
      3071.61, 3069.68, 3072.72, 3073.02, 3084.75, 3078.74, 3073.73, 3076.24,
    ],
    pSidePressure: [
      2917.16, 5854.95, 5866.31, 2947.32, 2944.64, 2931.4, 2936.46, 2936.95,
      3069.42, 3067.9, 3069.36, 3071.77, 3064.2, 3068.23, 3068.06, 3068.16,
      3067.24, 3067.12, 3071.69, 3073.82, 3073.39, 3073.23, 3072.74, 3072.31,
      3071.61, 3069.68, 3072.72, 3073.02, 3084.75, 3078.74, 3073.73, 3076.24,
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
            prevIndex === millData.millSpeed.length - 1 ? 0 : prevIndex + 1;
          console.log("Updated Index: ", newIndex); // Debugging
          return newIndex;
        });
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval); // Clean up the interval
    }
  }, [timeFrame, millData.millSpeed.length]); // Only run for "Now"

  // Update the logic in getDataForTimeFrame

  const getDataForTimeFrame = () => {
    if (timeFrame === "Now") {
      // This should plot the data progressively until dataIndex
      return {
        labels: millData.millSpeed
          .slice(0, dataIndex + 1)
          .map((_, index) => index * 15),
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
            data: millData.gSidePressure.slice(
              0,
              Math.min(dataIndex + 1, millData.gSidePressure.length)
            ), // Ensure slice only up to available data
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
        labels: staticMillData.millSpeed
          .slice(-dataLength)
          .map((_, index) => index * 15),
        datasets: [
          {
            label: "Mill Speed",
            data: staticMillData.millSpeed.slice(-dataLength),
            borderColor: "#7B61FF",
            backgroundColor: "#7B61FF",
            fill: false,
            tension: 0.4,
            yAxisID: "y1",
          },
          {
            label: "Mill Ratio",
            data: staticMillData.millRatio.slice(-dataLength),
            borderColor: "#F5A25D",
            backgroundColor: "#F5A25D",
            fill: false,
            tension: 0.4,
            yAxisID: "y2",
          },
          {
            label: "G Side Pressure",
            data: staticMillData.gSidePressure.slice(-dataLength), // Plot last N data points
            borderColor: "#4AB5EB",
            backgroundColor: "#4AB5EB",
            fill: false,
            tension: 0.4,
            yAxisID: "y3",
          },
          {
            label: "P Side Pressure",
            data: staticMillData.pSidePressure.slice(-dataLength),
            borderColor: "#FAD862",
            backgroundColor: "#FAD862",
            fill: false,
            tension: 0.4,
            yAxisID: "y4",
          },
          {
            label: "First Mill Extraction",
            data: staticMillData.firstMillExtraction.slice(-dataLength),
            borderColor: "#456CFF",
            backgroundColor: "#456CFF",
            fill: false,
            tension: 0.4,
            yAxisID: "y5",
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
        position: "right",
        title: {
          display: true,
          text: "G Side Pressure",
          color: "#4AB5EB",
        },
      },
      y4: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "P Side Pressure",
          color: "#FAD862",
        },
      },
      y5: {
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
