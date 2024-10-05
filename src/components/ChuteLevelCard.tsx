"use client";
import React, { useEffect, useState } from "react";
import Status from "./Status";

interface valueProps {
  percentage: number;
  prediction?: number;
  unit?: string;
}

export default function ChuteLevelCard({
  percentage,
  prediction,
  unit,
}: valueProps) {
  const [isCrisis, setIsCrisis] = useState(false);
  const barHeight = (percentage / 100) * 268;
  const formattedChuteValue = parseFloat(percentage.toFixed(2));

  useEffect(() => {
    setIsCrisis(formattedChuteValue < 50 || formattedChuteValue > 80);
  }, [formattedChuteValue]);

  // Determine the color based on isCrisis or percentage
  const getLineColor = () => {
    if (isCrisis) {
      return "#FF5A65"; // Crisis color
    }
    return "#062F6E"; // Regular color when not in crisis
  };

  let status: "add" | "minus" | "equal" = "equal"; // Default to "equal" if no prediction

  // Ensure status is one of the three accepted values
  if (prediction !== undefined) {
    status =
      prediction > percentage ? "add" : prediction < percentage ? "minus" : "equal";
  }

  return (
    <div className="min-w-[283px] min-h-[400px] bg-white px-[25px] py-[30px] rounded-2xl drop-shadow-xl">
      <div className="text-2xl text-primary-navy-blue font-bold">
        Chute Level
      </div>
      <div className="text-sm text-primary-blue">Percentage</div>
      <div className="flex items-center justify-center space-x-5 mt-5">
        <div className="w-[50px] h-[268px] bg-custom-bg rounded-lg overflow-hidden">
          {/* The line that changes color */}
          <div
            className="absolute bottom-[30px] w-[50px] rounded-lg"
            style={{
              height: `${barHeight}px`, // Dynamic height based on percentage
              backgroundColor: getLineColor(),
            }}
          />
          {/* Percentage text */}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`text-3xl font-bold ${
              isCrisis ? "text-red" : "text-primary-navy-blue"
            }`}
          >
            {formattedChuteValue}%
          </div>
          {status !== "equal" && prediction !== undefined && (
            <Status status={status} prediction={prediction} unit={unit} />
          )}
        </div>
      </div>
    </div>
  );
}
