"use client";
import React from "react";
import Status from "./Status";

interface valueProps {
  percentage: number;
  prediction: number;
}

export default function MillExtractionCard({
  percentage,
  prediction,
}: valueProps) {
  const status = prediction > percentage ? "add" : "minus";
  const formattedPercentage = percentage.toFixed(2);

  return (
    <div className="min-w-[300px] min-h-[250px] bg-white px-[25px] py-[30px] rounded-2xl drop-shadow-xl flex flex-col space-y-[10px]">
      <div>
        <div className="text-2xl text-primary-navy-blue font-bold">
          First Mill Extraction
        </div>
        <div className="text-sm text-primary-blue">Percentage</div>
      </div>
      <div className="flex items-center justify-center space-x-5">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="117"
            height="150"
            viewBox="40 20 180 200"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset={`${percentage}%`} stopColor="#062F6E" />
                <stop offset={`${percentage}%`} stopColor="#F4F7FE" />
              </linearGradient>
            </defs>
            <path
              d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75Zm9.85,105.59a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"
              fill="url(#grad)"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-primary-navy-blue font-bold text-3xl">
            {formattedPercentage}%
          </div>
          <Status status={status} prediction={prediction} />
        </div>
      </div>
    </div>
  );
}
