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
      40.93188666666666, 41.53821538461538, 42.1766, 40.85375555555556,
      42.2286875, 42.222813333333335, 42.135106666666665, 42.10496153846154,
      42.4312, 41.87388666666666, 41.61915555555556, 42.0339, 42.40504285714286,
      40.908260000000006, 41.43683333333333, 42.19234, 42.10821428571428,
      42.075320000000005, 42.17713333333334, 42.37836, 41.768386666666665,
      40.73483571428572, 42.523633333333336, 43.108, 42.85344166666667,
      43.54655, 41.634366666666665, 41.64959230769231, 42.22788571428571,
      41.870160000000006, 42.63820714285714, 43.14838333333333,
    ],
    moisture: [
      42.52235333333333, 42.26698461538462, 42.478275, 44.005766666666666,
      41.3603375, 41.31212, 41.73322, 41.49173846153846, 40.924420000000005,
      40.48454666666667, 41.03766666666667, 41.20025714285714,
      40.84598571428571, 42.72551333333333, 42.55533333333334,
      41.087853333333335, 40.88042142857143, 40.687713333333335, 40.52908,
      40.279293333333335, 41.24104, 42.53485, 40.413986666666666,
      38.71761818181818, 39.27316666666667, 38.53735, 40.83936666666667,
      40.67987692307692, 39.75608571428571, 40.4474, 40.16772142857143,
      38.503683333333335,
    ],
    pol: [
      14.793233333333331, 14.21696153846154, 13.360375, 13.929655555555556,
      13.486225, 13.5652, 13.666266666666669, 13.695607692307693,
      13.544213333333332, 13.5379, 13.844333333333331, 13.85505,
      14.106364285714289, 15.367, 15.126006666666663, 13.924293333333331,
      13.950685714285711, 14.102626666666668, 14.84112, 14.568553333333334,
      14.979073333333334, 16.10184285714286, 14.428873333333334,
      13.350072727272726, 13.359333333333334, 13.837357142857142,
      15.557008333333334, 15.119292307692309, 14.64942142857143, 14.62224,
      13.888292857142858, 13.19475,
    ],
    firstMillExtraction: [
      72.89335333333334, 74.16583076923077, 75.059675, 74.77127777777778,
      76.2900625, 75.81694666666667, 76.1747, 74.00877692307692, 76.1238,
      75.05999333333332, 73.60867777777779, 76.18122857142858,
      74.85998571428571, 72.50690666666667, 72.57264, 76.39144,
      76.61062857142858, 74.98694, 71.72735333333334, 72.84415333333332,
      73.19624, 71.93984999999999, 74.64567333333333, 76.18437272727273,
      75.48378333333334, 74.83208571428572, 72.2681, 73.40555384615385,
      74.52969285714286, 73.54656666666666, 75.84852857142857, 75.675675,
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
